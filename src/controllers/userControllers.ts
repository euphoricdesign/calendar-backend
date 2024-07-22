import { Request, Response } from "express"
import { loginUserService, registerNewUserService } from "../services/userService"
import UserRepository from "../repositories/UserRepository";
import { generateJWT } from "../helpers/generateJWT";

interface CustomRequest extends Request {
    id?: number;
    name?: string;
}

export const registerNewUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    let user = await UserRepository.findOne({
        where: { email }
    });

    if (user) {
        return res.status(400).json({
            ok: false,
            msg: "Un usuario ya existe con ese correo"
        })
    }

    user = await registerNewUserService({name,email, password})

    const token = await generateJWT(user.id, user.name)

    res.status(201).json({
        ok: true,
        user,
        token
    })

}

export const loginUser = async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error('Error en loginUser:', error)
        res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        })
    }
}


  
  export const revalidateToken = async (req: CustomRequest, res: Response) => {
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
        token
    })
}