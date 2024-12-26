import { Router } from 'express';
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getMovies);
router.get('/:id', authenticateToken, getMovieById);
router.post('/', authenticateToken, createMovie);
router.put('/:id', authenticateToken, updateMovie);
router.delete('/:id', authenticateToken, deleteMovie);

export default router;
