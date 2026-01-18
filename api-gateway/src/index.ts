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
    CATALOG_SERVICE: 'http://localhost:3002/courses',
    CONTENT_SERVICE: 'http://localhost:3003',
    ENROLLMENT_SERVICE: 'http://localhost:3004',
    ACTIVITIES_SERVICE: 'http://localhost:3005',
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

const adminOrTeacherMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'API Gateway: Credenciais não fornecidas.' });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        
        console.log('Token decodificado:', decoded);
        if (decoded.role !== 'ADMIN' && decoded.role !== 'TEACHER') {
            return res.status(403).json({ 
                message: `API Gateway: O papel '${decoded.role}' não tem permissão para esta operação. Apenas ADMIN e TEACHER podem acessar.` 
            });
        }

        req.headers['x-user-id'] = decoded.sub || decoded.id;
        req.headers['x-user-role'] = decoded.role;

        console.log('Permissão concedida para o papel:', decoded.role);
        next();
    } catch (error) {
        console.log('Token inválido:', error);
        return res.status(403).json({ message: 'API Gateway: Token rejeitado.' });
    }
};


// Todas as rotas agora começam com /api/v1/
app.use('/api/v1/auth/sign-up/teacher', securityMiddleware('ADMIN'));


// Todas as rotas agora começam com /api/v1/ e o pathRewrite remove apenas o prefixo /api/v1
const pathRewriteApiV1 = { '^/api/v1': '' };

app.use('/api/v1/auth/sign-up/teacher', securityMiddleware('ADMIN'));

app.use('/api/v1/auth', createProxyMiddleware({
    target: SERVICE_REGISTRY.AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/courses', adminOrTeacherMiddleware, (req, res, next) => {
    console.log(`[API Gateway] Proxy /api/v1/courses: ${req.method} ${req.originalUrl}`);
    next();
}, createProxyMiddleware({
    target: SERVICE_REGISTRY.CATALOG_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/lessons', createProxyMiddleware({
    target: SERVICE_REGISTRY.CONTENT_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/live-sessions', createProxyMiddleware({
    target: SERVICE_REGISTRY.CONTENT_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/enrollments', createProxyMiddleware({
    target: SERVICE_REGISTRY.ENROLLMENT_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/enrollments/:enrollmentId/payment', createProxyMiddleware({
    target: SERVICE_REGISTRY.ENROLLMENT_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/access-history', createProxyMiddleware({
    target: SERVICE_REGISTRY.ENROLLMENT_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/forums', createProxyMiddleware({
    target: SERVICE_REGISTRY.ACTIVITIES_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/topics', createProxyMiddleware({
    target: SERVICE_REGISTRY.ACTIVITIES_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/posts', createProxyMiddleware({
    target: SERVICE_REGISTRY.ACTIVITIES_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/private-messages', createProxyMiddleware({
    target: SERVICE_REGISTRY.ACTIVITIES_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/assessments', createProxyMiddleware({
    target: SERVICE_REGISTRY.ACTIVITIES_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/questions', createProxyMiddleware({
    target: SERVICE_REGISTRY.ACTIVITIES_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));

app.use('/api/v1/submissions', createProxyMiddleware({
    target: SERVICE_REGISTRY.ACTIVITIES_SERVICE,
    changeOrigin: true,
    pathRewrite: pathRewriteApiV1,
}));


app.listen(PORT, () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
});