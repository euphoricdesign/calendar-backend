import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateJWT = (id: number | undefined | JwtPayload, name: string | undefined | JwtPayload) => {
    return new Promise<string>((res, rej) => {
        const payload = { id, name };

        // Verificar que SECRET_JW_SEED esté definido
        const secret = process.env.SECRET_JWT_SEED;
        if (!secret) {
            return rej('El secreto de JWT no está definido');
        }

        jwt.sign(payload, secret, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err);
                return rej('No se pudo generar el token');
            }

            res(token as string);
        });
    });
}
