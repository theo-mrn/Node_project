import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authenticateToken';
import Comment from '../models/comment';

// Ajouter un commentaire
export const addComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { movieId, content, username } = req.body;

    if (!movieId || !content) {
      res.status(400).json({ error: 'Les champs movieId et content sont requis.' });
      return;
    }

    // Si le commentaire provient d'un utilisateur authentifié
    const userId = req.user ? req.user.id : null;

    const comment = await Comment.create({
      movieId,
      content,
      userId,
      username: username || null, // Si pas de username, stocker null
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};

// Récupérer les commentaires d'un film
export const getCommentsByMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { movieId } = req.params;

    const comments = await Comment.findAll({
      where: { movieId: Number(movieId) },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};