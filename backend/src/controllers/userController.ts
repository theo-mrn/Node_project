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
      isdirector: isdirector || false, 
    });

    // Génération du token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isDirector: newUser.isdirector },
      'your-secret-key', 
      { expiresIn: '1h' } 
    );

    res.status(201).json({
      message: 'User registered successfully.',
      token, 
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


export const updateSelfDirectorStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(403).json({ error: 'Utilisateur non authentifié.' });
      return;
    }

    const { isdirector } = req.body;

    if (typeof isdirector !== 'boolean') {
      res.status(400).json({ error: 'Le champ "isdirector" doit être un booléen.' });
      return;
    }

    const userId = req.user.id;

    console.log(`Mise à jour pour l'utilisateur ID : ${userId}, isdirector : ${isdirector}`);

    await sequelize.query(
      'UPDATE "users" SET "isdirector" = :isdirector, "updatedAt" = NOW() WHERE "id" = :id',
      {
        replacements: { isdirector, id: userId },
        type: QueryTypes.UPDATE,
      }
    );

    res.status(200).json({ message: 'Statut de directeur mis à jour avec succès.', isdirector });
  } catch (error) {
    console.error('Erreur dans updateSelfDirectorStatus :', error);
    res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};