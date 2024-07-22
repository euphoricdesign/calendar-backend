import CredentialsDto from "../dto/credentialsDto";
import { Credential } from "../entities/Credential";
import CredentialRepository from "../repositories/CredentialRepository";

export const createCredentialsService = async (credentials: CredentialsDto): Promise<Credential> => {
    console.log(credentials);
    
    try {
        const newCredential = new Credential()
        newCredential.email = credentials.email
        newCredential.password = credentials.password
    
        CredentialRepository.save(newCredential)
        
        return newCredential
    } catch (error) {
        console.error('Hubo un problema con la operación:', error);
        throw error;
    }
}

export const validateCredentials = async (credentials: CredentialsDto) => {
    // const { username, password } = credentials
    // const foundCredentials = userCredentials.find(credential => credential.username === username && credential.password === password)

    // if (foundCredentials && foundCredentials.username === username && foundCredentials.password === password) {
    //     return foundCredentials.id
    // } else {
    //     throw Error("Credenciales no válidas")
    // }
}

