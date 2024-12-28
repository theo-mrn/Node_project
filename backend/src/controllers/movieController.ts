import { Request, Response } from 'express';
import { Movie } from '../models/movie';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const movies = await Movie.findAll();
  res.json(movies);
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const movie = await Movie.findByPk(id);
  if (!movie) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }
  res.json(movie);
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
  const newMovie = await Movie.create(req.body);
  res.status(201).json(newMovie);
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const [updated] = await Movie.update(req.body, { where: { id } });
  if (!updated) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }
  const updatedMovie = await Movie.findByPk(id);
  res.json(updatedMovie);
};

export const deleteMovie = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Ajoutez un log pour vérifier `req.user`
    console.log('User attempting to delete movie:', req.user);

    if (!req.user || !req.user.isdirector) {
      res.status(403).json({ error: 'Access denied. Only directors can delete movies.' });
      return;
    }

    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ error: 'Movie not found.' });
      return;
    }

    await movie.destroy();
    res.status(200).json({ message: 'Movie deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteMovie:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


export const rateMovie = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Récupérer l'ID du film
  const { rating } = req.body; // Note envoyée par l'utilisateur

  if (rating < 1 || rating > 20) {
    res.status(400).json({ error: 'Rating must be between 1 and 20.' });
    return;
  }

  try {
    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ error: 'Movie not found.' });
      return;
    }

    movie.rating = rating; // Mise à jour de la note
    await movie.save();

    res.status(200).json({ message: 'Rating updated successfully.', movie });
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};