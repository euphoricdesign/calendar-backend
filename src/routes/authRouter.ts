import { Router } from "express";
import { loginUser, registerNewUser } from "../controllers/authControllers";

const authRouter = Router()

authRouter.post('/register', registerNewUser)
authRouter.post('/login', loginUser)

export default authRouter