import UserDto from "../dto/UserDto"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { createCredentialsService } from "./credentialService"
import UserRepository from "../repositories/UserRepository"
import CredentialRepository from "../repositories/CredentialRepository"



export class CustomError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  }



  export const registerNewUserService = async (userData: UserDto): Promise<User> => {
    console.log("Registrando nuevo usuario:", userData)
    try {
        const newCredentials: Credential = await createCredentialsService({ email: userData.email, password: userData.password })
        console.log("Credenciales creadas:", newCredentials)

        const newUser = {
            name: userData.name,
            email: userData.email,
        }

        const createdUser: User = await UserRepository.create(newUser)
        console.log("Usuario creado:", createdUser)

        createdUser.credential = newCredentials
        await UserRepository.save(createdUser)
        console.log("Usuario guardado con credenciales:", createdUser)
        
        return createdUser
    } catch (error) {
        console.error("Error en registerNewUserService:", error)
        throw new CustomError("Error al crear el usuario", 400)
    }
}

export const loginUserService = async (credentials: any) => { //* Ver de crear un DTO para esto 
    
    try {
        const { email, password } = credentials
        const credential = await CredentialRepository.findOne({
            where: { email }
        })
    
        if (!credential || credential.password !== password) throw new CustomError("Credenciales invalidas", 401)
        else {
            const user = await UserRepository.findOneBy({id: credential.id})
            const response = {
                login: true,
                user: user
            }
            return response
        }
    } catch (error) {
        throw error
    }
}