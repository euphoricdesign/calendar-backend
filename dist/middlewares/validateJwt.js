"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateJwt = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No autorizado. Falta el token el la petición"
        });
    }
    try {
        const secret = process.env.SECRET_JWT_SEED;
        if (!secret) {
            return res.status(401).json({
                ok: false,
                msg: 'El secreto de JWT no está definido'
            });
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.id = payload.id;
        req.name = payload.name;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido"
        });
    }
    next();
};
exports.default = validateJwt;
