import AppDataSource from "./config/data-source";
import server from "./server";
import "reflect-metadata"

require('dotenv').config()

AppDataSource.initialize().then(() => {
    console.log("Conexión a la base de datos realizada con exito!");
    
    server.listen(process.env.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
    })
}).catch((error) => console.log(error))

