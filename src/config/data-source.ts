import { DataSource } from "typeorm"
import { Credential } from "../entities/Credential";
import { Event } from "../entities/Event";
import { User } from "../entities/User";

require('dotenv').config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [Credential, Event, User],
    migrations: ['dist/migrations/*{.ts,.js}'],
    dropSchema: true,
    synchronize: true,
})

export default AppDataSource