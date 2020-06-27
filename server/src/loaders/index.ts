import koasLoader from './koa';
import mysql from '../utils/mysqlConect';
const logger = require("../utils/logUtil")("koasLoader");
module.exports = async({koaApp}) => {
  let sequelize = await mysql();                                        // mysql链接
  sequelize.query('SELECT * FROM `user`', { raw: true, type: sequelize.QueryTypes.SELECT })
  .then(projects => {
    console.log(projects[0].user_name)
  })
  await koasLoader({ app: koaApp });                    // koa加载器
  logger.info('koa loaded!');
};
