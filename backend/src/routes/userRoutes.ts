import { Router, Request, Response } from 'express';
import { authenticateToken, AuthenticatedRequest } from '../middleware/authenticateToken';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  updateDirectorStatus,
} from '../controllers/userController';

const router = Router();

// Routes publiques
router.post('/register', registerUser); // Inscription d'un utilisateur
router.post('/login', loginUser);       // Connexion d'un utilisateur

// Route sécurisée pour vérifier le rôle utilisateur

router.get('/is-director', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  // Vérifiez que req.user est défini
  if (!req.user) {
    res.status(403).json({ error: 'Utilisateur non authentifié.' });
    return;
  }

  // Retournez le statut `isDirector`
  res.json({ isDirector: req.user.isdirector });
});


// Route de test sécurisée
router.get('/test', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    res.json({
      message: 'Route test accessible',
      user: req.user, // Retourne l'utilisateur authentifié
    });
  } else {
    res.status(403).json({ error: 'Utilisateur non authentifié.' });
  }
});

// Routes dynamiques doivent venir après
router.get('/:id', getUserById);

// Routes sécurisées avec authenticateToken
router.use(authenticateToken); // Applique le middleware à toutes les routes suivantes

router.get('/', getUsers);                      // Récupérer tous les utilisateurs
router.post('/', createUser);                   // Créer un nouvel utilisateur
router.put('/:id', updateUser);                 // Mettre à jour un utilisateur existant
router.delete('/:id', deleteUser);              // Supprimer un utilisateur
router.put('/update-director-status', updateDirectorStatus); // Mettre à jour le statut de directeur

export default router;