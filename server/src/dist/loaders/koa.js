"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../routes"));
const config_1 = __importDefault(require("../config"));
module.exports = async ({ app }) => {
    app.use(cors_1.default({
        origin: function () {
            return "*";
        },
        credentials: true,
        allowMethods: ["GET", "POST", "OPTIONS"]
    }));
    app.use(routes_1.default.routes(), routes_1.default.allowedMethods());
    // jwt验证
    app.use(koa_jwt_1.default({ secret: config_1.default.jwtSecret }).unless({
        path: [/^\/public|\/user\/login|\/assets/]
    }));
    // app.use(KoaBody({
    //   multipart: true,
    //   strict: false,
    //   formidable: {
    //     uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    //   },
    //   jsonLimit: '10mb',
    //   formLimit: '10mb',
    //   textLimit: '10mb'
    // }))
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
    // error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
