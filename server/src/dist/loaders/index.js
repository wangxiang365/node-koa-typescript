"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("./koa"));
const mysql_1 = __importDefault(require("./mysql"));
const logger = require("../utils/logUtil")("koasLoader");
module.exports = async ({ koaApp }) => {
    await mysql_1.default(); // mysql链接
    await koa_1.default({ app: koaApp }); // koa加载器
    logger.info('koa loaded!');
};
