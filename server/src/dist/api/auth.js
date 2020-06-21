"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("koa-router")();
const typedi_1 = require("typedi");
const auth_1 = __importDefault(require("../services/auth"));
const Joi = require('@hapi/joi');
const logger = require("../utils/logUtil")("router");
router.prefix('/auth'); // 用户路由前缀
// 注册
router.post('/signup', async (req, res, next) => {
    var schema = Joi.object().keys({
        firstName: Joi.string().min(5).max(10).required().error(new Error('Give your error message here for first name')),
        lastName: Joi.string().min(5).max(10).required().error(new Error('Give your error message here for last name'))
    });
    const result = Joi.validate(req.body, schema);
    if (result.err) {
        console.log(err.message);
        return;
    }
    logger.info('Calling Sign-Up endpoint with body: %o', req.body);
    try {
        const authServiceInstance = typedi_1.Container.get(auth_1.default);
        const { user, token } = await authServiceInstance.SignUp(req.body);
        return res.status(201).json({ user, token });
    }
    catch (e) {
        logger.error('🔥 error: %o', e);
        // logger.error(`err|requestId=${ctx.requestId}|code=${err.code || -1}|message=${err.message}`);
        return next(e);
    }
});
// 登录
router.post('/signin', async (req, res, next) => {
    var schema = Joi.object().keys({
        firstName: Joi.string().min(5).max(10).required().error(new Error('Give your error message here for first name')),
        lastName: Joi.string().min(5).max(10).required().error(new Error('Give your error message here for last name'))
    });
    const result = Joi.validate(req.body, schema);
    if (result.err) {
        console.log(err.message);
        return;
    }
    logger.info('Calling Sign-In endpoint with body: %o', req.body);
    try {
        const { email, password } = req.body;
        const authServiceInstance = typedi_1.Container.get(auth_1.default);
        const { user, token } = await authServiceInstance.SignIn(email, password);
        return res.json({ user, token }).status(200);
    }
    catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
    }
});
/**
 * @TODO Let's leave this as a place holder for now
 * The reason for a logout route could be deleting a 'push notification token'
 * so the device stops receiving push notifications after logout.
 *
 * Another use case for advance/enterprise apps, you can store a record of the jwt token
 * emitted for the session and add it to a black list.
 * It's really annoying to develop that but if you had to, please use Redis as your data store
 */
router.post('/logout', (req, res, next) => {
    logger.info('Calling Sign-Out endpoint with body: %o', req.body);
    try {
        //@TODO AuthService.Logout(req.user) do some clever stuff
        return res.status(200).end();
    }
    catch (e) {
        logger.error('🔥 error %o', e);
        return next(e);
    }
});
module.exports = router;
