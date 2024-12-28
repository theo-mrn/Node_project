import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';
import { QueryTypes } from 'sequelize'; // Importation directe de QueryTypes
import { sequelize } from '../config/database';



// Récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un utilisateur
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hachage du mot de passe
    const newUser = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Modifier un utilisateur
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id } });
    if (!updated) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const updatedUser = await User.findByPk(id);
    res.json(updatedUser);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

// Inscription d'un utilisateur
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, isdirector } = req.body;

    // Vérifiez si l'email est déjà utilisé
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use.' });
      return;
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isdirector: isdirector || false, // Valeur par défaut si non spécifiée
    });

    // Génération du token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isDirector: newUser.isdirector },
      'your-secret-key', // Utilisez votre clé secrète
      { expiresIn: '1h' } // Durée de validité du token
    );

    res.status(201).json({
      message: 'User registered successfully.',
      token, // Inclure le token dans la réponse
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        isdirector: newUser.isdirector,
      },
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

  
    const token = jwt.sign(
      { id: user.id, email: user.email, isdirector: user.isdirector },
      'your-secret-key',
      { expiresIn: '12h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};





export const updateDirectorStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      console.error('Erreur : Utilisateur non authentifié.');
      res.status(403).json({ error: 'Utilisateur non authentifié.' });
      return;
    }

    // Extraire les données de la requête
    const userId = req.user.id; // ID utilisateur extrait du middleware
    const { isDirector } = req.body; // Nouvelle valeur pour isdirector

    console.log('Requête reçue pour mise à jour :');
    console.log(` - ID utilisateur : ${userId}`);
    console.log(` - Nouvelle valeur isDirector : ${isDirector}`);

    // Valider les données
    if (typeof isDirector === 'undefined') {
      console.error('Erreur : Champ "isDirector" manquant.');
      res.status(400).json({ error: 'Champ "isDirector" manquant.' });
      return;
    }

    // Exécuter la requête SQL brute
    console.log('Exécution de la requête SQL brute...');
    const [updatedRowsCount] = await sequelize.query(
      'UPDATE users SET isdirector = :isDirector, "updatedAt" = NOW() WHERE id = :id',
      {
        replacements: { isDirector, id: userId },
        type: QueryTypes.UPDATE, // Indique une requête de type UPDATE
      }
    );

    console.log('Nombre de lignes mises à jour via SQL brut :', updatedRowsCount);

    // Vérifier si une mise à jour a eu lieu
    if (updatedRowsCount === 0) {
      console.warn(`Aucune ligne mise à jour pour l'utilisateur ID : ${userId}`);
      res.status(404).json({ error: 'Utilisateur non trouvé ou aucune modification effectuée.' });
      return;
    }

    // Répondre au client
    console.log(`Mise à jour réussie pour l'utilisateur ID : ${userId}`);
    res.status(200).json({ message: 'Statut de directeur mis à jour.', id: userId, isDirector });
  } catch (error) {
    console.error('Erreur dans updateDirectorStatus :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};