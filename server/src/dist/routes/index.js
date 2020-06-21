"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('koa-router');
const config_1 = __importDefault(require("../config"));
const auth_1 = __importDefault(require("../api/auth"));
const router = new Router({
    prefix: config_1.default.api.prefix
});
// module.exports = (app) => {
// 	app.use(config.api.prefix, auth.routes()).use(auth.allowedMethods())
// }
// 引入自动引入插件
// const requireDirectory = require('require-directory')
// module.exports = (app) => {
// 	requireDirectory(module, './api', { visit: (obj) => {
// 		if (obj instanceof Router) {
// 			// app.use(config.api.prefix, obj.routes(), obj.allowedMethods())
// 			router.use(obj.routes(), obj.allowedMethods())
// 		}
// 	}})
// }
router.use(auth_1.default.routes());
module.exports = router;
