import { Router } from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../controllers/favoriteController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    await addFavorite(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete('/:movieId', authenticateToken, async (req, res, next) => {
  try {
    await removeFavorite(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    await getFavorites(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;