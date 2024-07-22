import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
    id: number;
    name: string;
}

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No autorizado. Falta el token el la petición"
        })
    }

    try {
        const secret = process.env.SECRET_JWT_SEED;
        if (!secret) {
            return res.status(401).json({
                ok: false,
                msg: 'El secreto de JWT no está definido'
            });
        }
        
        const payload = jwt.verify(token, secret) as JwtPayload;
        
        (req as any).id = payload.id;
        (req as any).name = payload.name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido"
        })
    }

    next()
}

export default validateJwt