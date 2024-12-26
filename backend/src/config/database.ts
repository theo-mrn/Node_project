import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'postgres', // Nom de la base de données
  process.env.DB_USER || 'postgres', // Nom d'utilisateur PostgreSQL
  process.env.DB_PASSWORD || 'postgre', // Mot de passe PostgreSQL
  {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433', 10), // Port PostgreSQL
    logging: console.log,
    dialect: 'postgres', // Type de base de données
  }
);
