"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const userService_1 = require("./services/userService");
const server = (0, express_1.default)();
server.use((0, morgan_1.default)('dev'));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(indexRouter_1.default);
server.use((err, req, res, next) => {
    console.error('Error capturado por el manejador global:', err);
    const statusCode = err instanceof userService_1.CustomError ? err.statusCode : 500;
    const errorResponse = {
        ok: false,
        message: err.message || 'Se produjo un error interno en el servidor',
    };
    if (err instanceof userService_1.CustomError && err.errors) {
        errorResponse.errors = err.errors;
    }
    else if (Array.isArray(err)) {
        // Para manejar errores de express-validator directamente
        errorResponse.errors = err;
    }
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    res.status(statusCode).json(errorResponse);
});
exports.default = server;
