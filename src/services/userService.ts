import UserDto from "../dto/UserDto"
import { User } from "../entities/User"
import { Credential } from "../entities/Credential"
import { createCredentialsService } from "./credentialService"
import UserRepository from "../repositories/UserRepository"
import CredentialRepository from "../repositories/CredentialRepository"
import bcrypt from 'bcrypt'




export class CustomError extends Error {
    statusCode: number;
    errors?: any[];

    constructor(message: string, statusCode: number, errors?: any[]) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errors = errors;
        
        // Esto es para mantener un stack trace apropiado
        Error.captureStackTrace(this, this.constructor);
    }
}



  export const registerNewUserService = async (userData: UserDto): Promise<User> => {
    console.log("Registrando nuevo usuario:", userData)

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    try {
        const newCredentials: Credential = await createCredentialsService({ email: userData.email, password: hashedPassword })

        const newUser = {
            name: userData.name,
            email: userData.email,
        }

        const createdUser: User = await UserRepository.create(newUser)

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
    
        if (!credential || !(bcrypt.compareSync(password, credential.password))) throw new CustomError("Credenciales invalidas", 401)
        else {
            const user = await UserRepository.findOneBy({id: credential.id})
            
            return user
        }
    } catch (error) {
        if (error instanceof CustomError) {
            // Error personalizado, devolver el mensaje específico al usuario
            throw error; // Propagar el mismo error
        } else {
            console.error("Error en loginUserService:", error);
            throw new CustomError("Error al loguear usuario", 500);
        }
    }
}