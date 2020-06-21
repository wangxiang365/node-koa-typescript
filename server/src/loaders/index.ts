import koasLoader from './koa';
import mysql from './mysql';
const logger = require("../utils/logUtil")("koasLoader");
module.exports = async({koaApp}) => {
  await mysql();                                        // mysql链接
  await koasLoader({ app: koaApp });                    // koa加载器
  logger.info('koa loaded!');
};
