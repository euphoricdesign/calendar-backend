import { Request, Response } from "express"

export const registerNewUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    console.log(name, email, password)
    res.send(`Nuevo usuario creado: ${name}`)

}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(email, password)
    res.send(`Usuario logueado: ${email}`)

}