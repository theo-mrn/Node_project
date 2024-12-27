import express from 'express';
import { addRating } from '../controllers/ratingController';

const router = express.Router();

router.post('/movies/:movieId/rate', addRating);

export default router;