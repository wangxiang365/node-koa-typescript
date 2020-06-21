import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import config from '../config';
const logger = require("../utils/logUtil")("mysql");
var email = require('../utils/email.ts')
module.exports = async() => {
  const sequelize = new Sequelize({
    host: config.mysql.host,
    database: config.mysql.database,
    username: config.mysql.user,
    password: config.mysql.password,
    dialect: 'mysql',
    // 加载我们的实体
    modelPaths: [path.resolve(__dirname, `../models`)],
    pool: {
      // 连接池的一些相关配置
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    // true会在控制台打印每次sequelize操作时对应的SQL命令
    logging: (msg) => logger.info(msg)         // 使用自定义记录器(Winston), 显示第一个参数
  })
  sequelize.authenticate().then(() => {
    logger.info("mysql connect start!");
  }).catch(err => {
    logger.error("Unable to connect to the database:", JSON.stringify(err));
    email.sendEmail('shanyanwt@163.com', 'mysql-error', "shanyanwt@163.com",
      'Mysql 连接失败', '<p>错误信息: </p>' + JSON.stringify(err) + '<p>请你及时处理</p >'
    ).then(() => {
      logger.info("mysql错误邮箱提示发送成功！");
    }).catch(er => {
      logger.error("mysql错误邮箱提示发送失败！", er);
    })
  });
}