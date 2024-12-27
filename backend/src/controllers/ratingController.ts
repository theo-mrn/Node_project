import { Request, Response } from 'express';
import Rating from '../models/rating';
import Movie from '../models/movie';
import { sequelize } from '../config/database';

export const addRating = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const { userId, rating } = req.body;

    if (!movieId || !rating || !userId) {
      return res.status(400).json({ error: 'movieId, userId, and rating are required.' });
    }

    if (rating < 1 || rating > 20) {
      return res.status(400).json({ error: 'Rating must be between 1 and 20.' });
    }

    // Ajouter une nouvelle évaluation
    await Rating.create({ movieId: Number(movieId), userId, rating });

    // Recalculer la moyenne des notes
    const averageRating = await Rating.findAll({
      where: { movieId: Number(movieId) },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']],
      raw: true,
    });

    const avgRating = Number(averageRating[0].avgRating).toFixed(2);

    // Mettre à jour la moyenne dans la table des films
    const movie = await Movie.findByPk(movieId);
    if (movie) {
      movie.rating = Number(avgRating);
      await movie.save();
    }

    res.status(201).json({ message: 'Rating added successfully.', avgRating });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};