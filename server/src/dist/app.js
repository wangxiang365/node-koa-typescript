"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // We need this in order to use @Decorators
const koa_1 = __importDefault(require("koa"));
const config_1 = __importDefault(require("./config"));
const logger = require("./utils/logUtil")("app");
const loaders_1 = __importDefault(require("./loaders"));
async function startServer() {
    const app = new koa_1.default();
    await loaders_1.default({ koaApp: app }); // koa配置
    app.listen(config_1.default.port, err => {
        if (err) {
            logger.error(err);
            process.exit(1);
            return;
        }
        logger.info(`Server listening on port: ${config_1.default.port}`);
    });
}
startServer();
