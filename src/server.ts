import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import indexRouter from './routes/indexRouter'

const server = express();

server.use(morgan('dev'))

server.use(cors()) 

server.use(express.json())

server.use(indexRouter)

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.statusCode)
    res.status(err.statusCode || 500).json({ error: err.message })
})

export default server