import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded; // Stocke l'utilisateur dans req pour usage ultérieur
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token.' });
  }
};
