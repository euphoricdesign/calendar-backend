"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const express_validator_1 = require("express-validator");
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateJwt_1 = __importDefault(require("../middlewares/validateJwt"));
const userRouter = (0, express_1.Router)();
userRouter.post('/register', [
    (0, express_validator_1.body)('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 6 }).withMessage('El nombre debe tener al menos 6 caracteres'),
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ingresar un email válido'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateFields_1.default
], userControllers_1.registerNewUser);
userRouter.post('/login', [
    (0, express_validator_1.body)('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ingresar un email válido'),
    (0, express_validator_1.body)('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], userControllers_1.loginUser);
userRouter.get('/renew', validateJwt_1.default, userControllers_1.revalidateToken);
exports.default = userRouter;
