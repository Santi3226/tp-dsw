import { Request,RequestHandler, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface User {
      id: number;
      paciente?: number; //Campos del payload
      email?: string;
      role?: string;
    }
    interface Request {
      user?: any;
    }
  }
}

const claveJWT = process.env.claveJWT || '';

export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();

  if (!claveJWT) {
    console.error('claveJWT no definida en .env');
    res.status(500).json({ error: 'Server misconfiguration' });
    return;
  }

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Petición sin token' });
    return;
  }

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, claveJWT) as any;
    (req as any).user = payload; // Ahora los controladores tienen req.user
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
    return;
  }
};