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
    if (!req.user?.isDirector) {
      res.status(403).json({ error: 'Access denied. Only directors can delete movies.' });
      return;
    }

    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    await movie.destroy();
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};