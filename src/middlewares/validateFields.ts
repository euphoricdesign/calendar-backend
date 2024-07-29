import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import { CustomError } from "../services/userService";

const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        next(new CustomError('Error de validación', 400, errors.array()));
    } else {
        next()
    }
}

export default validateFields