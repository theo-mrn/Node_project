import { Router, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticateToken';

const router = Router();
// Une route pour savoir si on est director ou pas 
router.get('/is-director', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(403).json({ error: 'Utilisateur non authentifié.' });
  }

  // Retournez le statut `isDirector`
  res.json({ isDirector: req.user.isdirector });
});

export default router;