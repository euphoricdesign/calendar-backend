import { NextFunction, Request, Response } from "express"
import { loginUserService, registerNewUserService } from "../services/userService"
import UserRepository from "../repositories/UserRepository";
import { generateJWT } from "../helpers/generateJWT";

interface CustomRequest extends Request {
    id?: number;
    name?: string;
}

export const registerNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    try {
        let user = await UserRepository.findOne({
            where: { email }
        });

        if (user) {
            const error = new Error("Un usuario ya existe con ese correo") as any;
            error.statusCode = 400;
            throw error;
        }

        user = await registerNewUserService({name, email, password});
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            user,
            token
        });
    } catch (error: any) {
        console.error('Error en registerNewUser:', error);
        return next(error);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        const user = await loginUserService({ email, password })

        if (!user) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales incorrectas"
            })
        }

        const token = await generateJWT(user.id, user.name)

        res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error: any) {
        console.error('Error en loginUser:', error);
        return next(error);  // Pasamos el error al siguiente middleware
    }
}
  
  export const revalidateToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { id, name } = req;

        if (!id || !name) {
            return res.status(400).json({
                ok: false,
                msg: "ID o nombre no encontrados en la solicitud"
            });
        }

        const token = await generateJWT(id, name);


        res.status(200).json({
            ok: true,
            id, name,
            token
        })
    } catch (error) {
        return next(error)
    }
}