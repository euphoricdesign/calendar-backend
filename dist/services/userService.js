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
exports.loginUserService = exports.registerNewUserService = exports.CustomError = void 0;
const credentialService_1 = require("./credentialService");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const CredentialRepository_1 = __importDefault(require("../repositories/CredentialRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.CustomError = CustomError;
const registerNewUserService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Registrando nuevo usuario:", userData);
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
    try {
        const newCredentials = yield (0, credentialService_1.createCredentialsService)({ email: userData.email, password: hashedPassword });
        const newUser = {
            name: userData.name,
            email: userData.email,
        };
        const createdUser = yield UserRepository_1.default.create(newUser);
        createdUser.credential = newCredentials;
        yield UserRepository_1.default.save(createdUser);
        console.log("Usuario guardado con credenciales:", createdUser);
        return createdUser;
    }
    catch (error) {
        console.error("Error en registerNewUserService:", error);
        throw new CustomError("Error al crear el usuario", 400);
    }
});
exports.registerNewUserService = registerNewUserService;
const loginUserService = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = credentials;
        const credential = yield CredentialRepository_1.default.findOne({
            where: { email }
        });
        if (!credential || !(bcrypt_1.default.compareSync(password, credential.password)))
            throw new CustomError("Credenciales invalidas", 401);
        else {
            const user = yield UserRepository_1.default.findOneBy({ id: credential.id });
            return user;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.loginUserService = loginUserService;
