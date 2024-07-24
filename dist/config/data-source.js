"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Credential_1 = require("../entities/Credential");
const Event_1 = require("../entities/Event");
const User_1 = require("../entities/User");
require('dotenv').config();
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [Credential_1.Credential, Event_1.Event, User_1.User],
    migrations: ['dist/migrations/*{.ts,.js}'],
    dropSchema: true,
    synchronize: true,
});
exports.default = AppDataSource;
