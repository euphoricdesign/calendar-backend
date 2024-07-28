"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateToken = exports.loginUser = exports.registerNewUser = void 0;
const userService_1 = require("../services/userService");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const generateJWT_1 = require("../helpers/generateJWT");
const registerNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        let user = yield UserRepository_1.default.findOne({
            where: { email }
        });
        if (user) {
            const error = new Error("Un usuario ya existe con ese correo");
            error.statusCode = 400;
            throw error;
        }
        user = yield (0, userService_1.registerNewUserService)({ name, email, password });
        const token = yield (0, generateJWT_1.generateJWT)(user.id, user.name);
        res.status(201).json({
            ok: true,
            user,
            token
        });
    }
    catch (error) {
        console.error('Error en registerNewUser:', error);
        return next(error);
    }
});
exports.registerNewUser = registerNewUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, userService_1.loginUserService)({ email, password });
        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales incorrectas"
            });
        }
        const token = yield (0, generateJWT_1.generateJWT)(user.id, user.name);
        res.status(200).json({
            ok: true,
            user,
            token
        });
    }
    catch (error) {
        console.error('Error en loginUser:', error);
        return next(error); // Pasamos el error al siguiente middleware
    }
});
exports.loginUser = loginUser;
const revalidateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name } = req;
        if (!id || !name) {
            return res.status(400).json({
                ok: false,
                msg: "ID o nombre no encontrados en la solicitud"
            });
        }
        const token = yield (0, generateJWT_1.generateJWT)(id, name);
        res.status(200).json({
            ok: true,
            id, name,
            token
        });
    }
    catch (error) {
        return next(error);
    }
});
exports.revalidateToken = revalidateToken;
