import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authenticateToken';
import Comment from '../models/comment';


export const addComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(403).json({ error: 'User not authenticated.' });
      return;
    }

    const { id: userId, username } = req.user; // Récupération de l'utilisateur
    const { movieId, content } = req.body;

    if (!movieId || !content) {
      console.log('Missing movieId or content:', { movieId, content });
      res.status(400).json({ error: 'movieId and content are required.' });
      return;
    }

    console.log('Data received in backend:', { userId, username, movieId, content });

    const comment = await Comment.create({
      movieId,
      content,
      userId,
      username,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getCommentsByMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { movieId } = req.params;

    const comments = await Comment.findAll({
      where: { movieId: Number(movieId) },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};