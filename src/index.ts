import server from "./server";

require('dotenv').config()

server.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
})