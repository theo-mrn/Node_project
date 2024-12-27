import { Router } from 'express';
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  rateMovie,
} from '../controllers/movieController';
import { addComment, getCommentsByMovie } from '../controllers/commentController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getMovies);
router.get('/:id', authenticateToken, getMovieById);
router.post('/', authenticateToken, createMovie);
router.put('/:id', authenticateToken, updateMovie);
router.delete('/:id', deleteMovie);
router.put('/:id/rate', rateMovie);

router.get('/:movieId/comments', getCommentsByMovie);
router.post('/:movieId/comments', authenticateToken, addComment);
router.post('/movies/:movieId/comments', authenticateToken, addComment);

export default router;