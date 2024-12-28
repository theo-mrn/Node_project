import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token manquant ou invalide' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'your-secret-key') as { id: number; username: string };
    console.log('Token décodé avec succès :', decoded);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.log(`Utilisateur avec l'ID ${decoded.id} introuvable`);
      res.status(403).json({ error: 'Utilisateur non trouvé.' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du token :', error);
    res.status(403).json({ error: 'Token invalide ou expiré.' });
  }
};