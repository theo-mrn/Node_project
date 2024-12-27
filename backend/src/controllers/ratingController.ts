import { Request, Response } from 'express';
import Rating from '../models/rating';
import Movie from '../models/movie';
import { sequelize } from '../config/database';

export const addRating = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { movieId } = req.params;
    const { userId, rating } = req.body;

    if (!movieId || !userId || !rating) {
      return res.status(400).json({ error: 'movieId, userId, and rating are required.' });
    }

    if (rating < 1 || rating > 20) {
      return res.status(400).json({ error: 'Rating must be between 1 and 20.' });
    }

    // Ajouter la note
    await Rating.create({ movieId: Number(movieId), userId, rating });

    // Calculer la moyenne des notes
    const averageRating = await Rating.findAll({
      where: { movieId: Number(movieId) },
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']],
      raw: true,
    });

    const avgRating = parseFloat(averageRating[0]['avgRating']).toFixed(2);

    // Mettre à jour la moyenne dans la table "movies"
    const movie = await Movie.findByPk(movieId);
    if (movie) {
      movie.rating = parseFloat(avgRating); // Mise à jour de la moyenne
      await movie.save();
    }

    return res.status(201).json({ message: 'Rating added successfully.', avgRating });
  } catch (error) {
    console.error('Error adding rating:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};