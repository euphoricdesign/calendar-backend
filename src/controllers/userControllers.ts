import { Request, Response } from "express"
import { loginUserService, registerNewUserService } from "../services/userService"

export const registerNewUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const user = await registerNewUserService({name,email, password})
    res.status(201).json(user)

}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await loginUserService({email, password})

    res.status(200).json(user)

}