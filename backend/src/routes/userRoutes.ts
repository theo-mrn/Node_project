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
  updateSelfDirectorStatus, 
} from '../controllers/userController';
import { googleLogin } from '../controllers/userController';

const router = Router();

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);      


router.get('/is-director', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  if (!req.user) {
    res.status(403).json({ error: 'Utilisateur non authentifié.' });
    return;
  }
  res.json({ isDirector: req.user.isdirector });
});

router.get('/:id', getUserById);

router.use(authenticateToken);
router.put('/update-director-status', authenticateToken, updateSelfDirectorStatus);
router.get('/', getUsers);                     
router.post('/', createUser);                  
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);             
router.post('/google-login', googleLogin);


export default router;