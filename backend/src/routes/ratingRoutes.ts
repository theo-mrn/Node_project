import { Router } from 'express';
import { addRating } from '../controllers/ratingController';

const router = Router();

// Route pour ajouter une note
router.post('/:movieId/rate', async (req, res, next) => {
  try {
    await addRating(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;