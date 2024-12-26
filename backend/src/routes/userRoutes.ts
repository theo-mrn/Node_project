import { Router } from 'express';
import {
  loginUser,
  registerUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = Router();

// Route pour la connexion
router.post('/login', loginUser);

// Route pour l'inscription
router.post('/register', registerUser);

// Autres routes CRUD
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
