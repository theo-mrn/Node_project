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
  updateSelfDirectorStatus, // Correctement importé
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

// Routes dynamiques doivent venir après
router.get('/:id', getUserById);

// Routes sécurisées avec authenticateToken
router.use(authenticateToken); // Applique le middleware à toutes les routes suivantes
router.put('/update-director-status', authenticateToken, updateSelfDirectorStatus);
router.get('/', getUsers);                      // Récupérer tous les utilisateurs
router.post('/', createUser);                   // Créer un nouvel utilisateur
router.put('/:id', updateUser);                 // Mettre à jour un utilisateur existant
router.delete('/:id', deleteUser);              // Supprimer un utilisateur


export default router;