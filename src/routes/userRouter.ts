import { Router } from "express";
import { loginUser, registerNewUser } from "../controllers/userControllers";
import { body } from "express-validator"
import validateFields from "../middlewares/validateFields";

const userRouter = Router()

userRouter.post('/register', [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 6 }).withMessage('El nombre debe tener al menos 6 caracteres'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        validateFields
], registerNewUser)

userRouter.post('/login', [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
],loginUser)

export default userRouter