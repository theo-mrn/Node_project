import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access token missing or invalid' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    const user = await User.findByPk(decoded.id);

    if (!user) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }

    req.user = user; // Ajouter l'utilisateur authentifié à la requête
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
