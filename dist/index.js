"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("./config/data-source"));
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
require('dotenv').config();
data_source_1.default.initialize().then(() => {
    console.log("Conexión a la base de datos realizada con exito!");
    server_1.default.listen(process.env.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    });
}).catch((error) => console.log(error));
