import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; isDirector: boolean };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token missing or invalid' });
    return;
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }

    // Ajoutez `isDirector` à l'objet utilisateur.
    const user = decoded as { id: string; email: string; isDirector: boolean };
    req.user = user;
    next();
  });
};
