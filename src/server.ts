import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import indexRouter from './routes/indexRouter'
import { CustomError } from './services/userService';

const server = express();

server.use(morgan('dev'))

server.use(cors()) 

server.use(express.json())

server.use(indexRouter)

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error capturado por el manejador global:', err);

    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    
    const errorResponse: any = {
        ok: false,
        message: err.message || 'Se produjo un error interno en el servidor',
    };

    if (err instanceof CustomError && err.errors) {
        errorResponse.errors = err.errors;
    } else if (Array.isArray(err)) {
        // Para manejar errores de express-validator directamente
        errorResponse.errors = err;
    }

    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
})

export default server