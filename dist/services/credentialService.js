"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = exports.createCredentialsService = void 0;
const Credential_1 = require("../entities/Credential");
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const createCredentialsService = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(credentials);
    try {
        const newCredential = new Credential_1.Credential();
        newCredential.email = credentials.email;
        newCredential.password = credentials.password;
        CredentialRepository_1.default.save(newCredential);
        return newCredential;
    }
    catch (error) {
        console.error('Hubo un problema con la operación:', error);
        throw error;
    }
});
exports.createCredentialsService = createCredentialsService;
const validateCredentials = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    // const { username, password } = credentials
    // const foundCredentials = userCredentials.find(credential => credential.username === username && credential.password === password)
    // if (foundCredentials && foundCredentials.username === username && foundCredentials.password === password) {
    //     return foundCredentials.id
    // } else {
    //     throw Error("Credenciales no válidas")
    // }
});
exports.validateCredentials = validateCredentials;
