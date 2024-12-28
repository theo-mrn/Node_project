import { Request, Response } from 'express';
import { Favorite } from '../models/favorite';
import { Movie } from '../models/movie';


interface AuthenticatedRequest extends Request {
    user: {
      userId: number;
      email: string;
      isDirector: boolean;
    };
  }

  
export const addFavorite = async (req: Request, res: Response) => {
  const { userId } = req.user!;
  const { movieId } = req.body;

  const favorite = await Favorite.create({ userId, movieId });
  res.status(201).json(favorite);
};

export const removeFavorite = async (req: Request, res: Response) => {
  const { userId } = req.user!;
  const { movieId } = req.params;

  await Favorite.destroy({ where: { userId, movieId } });
  res.status(204).send();
};

export const getFavorites = async (req: AuthenticatedRequest, res: Response) => {
    const { userId } = req.user; // TypeScript ne devrait plus se plaindre ici
    try {
      const favorites = await Favorite.findAll({
        where: { userId },
        include: [{ model: Movie }],
      });
      res.status(200).json(favorites.map((fav) => fav.movieId));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ error: 'Failed to fetch favorites.' });
    }
  };