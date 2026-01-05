import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'SUA_SECRET';


const SERVICE_REGISTRY = {
    AUTH_SERVICE: 'http://localhost:3001',
};


app.use(cors({ origin: '*' })); 

const securityMiddleware = (requiredRole?: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'API Gateway: Credenciais não fornecidas.' });
        }

        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);

            console.log('Token decodificado:', decoded);
        
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ 
                    message: `API Gateway: O papel '${decoded.role}' não tem permissão para consumir este serviço.` 
                });
            }


            req.headers['x-user-id'] = decoded.sub || decoded.id;
            req.headers['x-user-role'] = decoded.role;

            next();
        } catch (error) {
            console.log('Token inválido:', error);
            return res.status(403).json({ message: 'API Gateway: Token rejeitado.' });
        }
    };
};

// Protege rota específica que requer ADMIN antes do proxy genérico
app.use('/auth/sign-up/teacher', securityMiddleware('ADMIN'));

app.use('/auth', createProxyMiddleware({
    target: SERVICE_REGISTRY.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
}));


app.listen(PORT, () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
});