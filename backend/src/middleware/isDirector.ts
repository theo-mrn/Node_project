import { Router, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticateToken';

const router = Router();

router.get('/is-director', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  // Vérifiez que req.user est défini
  if (!req.user) {
    return res.status(403).json({ error: 'Utilisateur non authentifié.' });
  }

  // Retournez le statut `isDirector`
  res.json({ isDirector: req.user.isdirector });
});

export default router;