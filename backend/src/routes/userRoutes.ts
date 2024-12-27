import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
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

// Route de test avec authentification
router.get('/test', authenticateToken, (req: any, res) => {
  if (req.user) {
    res.json({
      message: 'Route test accessible',
      user: req.user, // Retourne l'utilisateur authentifié
    });
  } else {
    res.status(403).json({ error: 'Utilisateur non authentifié' });
  }
});

// Routes dynamiques doivent venir après
router.get('/:id', getUserById);

// Routes sécurisées avec authenticateToken
router.use(authenticateToken); // Applique le middleware à toutes les routes suivantes

router.get('/', getUsers);                      // Récupérer tous les utilisateurs
router.get('/:id', getUserById);                // Récupérer un utilisateur par ID
router.post('/', createUser);                   // Créer un nouvel utilisateur
router.put('/:id', updateUser);                 // Mettre à jour un utilisateur existant
router.delete('/:id', deleteUser);              // Supprimer un utilisateur
router.put('/update-director-status', authenticateToken, updateDirectorStatus);


export default router;