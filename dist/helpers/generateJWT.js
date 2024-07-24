"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (id, name) => {
    return new Promise((res, rej) => {
        const payload = { id, name };
        // Verificar que SECRET_JW_SEED esté definido
        const secret = process.env.SECRET_JWT_SEED;
        if (!secret) {
            return rej('El secreto de JWT no está definido');
        }
        jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err);
                return rej('No se pudo generar el token');
            }
            res(token);
        });
    });
};
exports.generateJWT = generateJWT;
