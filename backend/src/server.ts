import express, { Application, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './config/database';
import movieRoutes from './routes/movieRoutes';
import userRoutes from './routes/userRoutes';
import swaggerDocument from './swagger/swagger.json';
import { errorHandler } from './middleware/errorHandler';
import ratingRoutes from './routes/ratingRoutes'; // Importer les routes des évaluations



const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);
app.use('/api', ratingRoutes); 
// Test de connexion à la base de données
sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err: Error) => console.error('Unable to connect to the database:', err));

// Synchronisation des tables (alter pour modifier la structure sans perdre de données)
sequelize
  .sync({ alter: true }) // Synchronise automatiquement les colonnes manquantes ou modifiées
  .then(() => console.log('Database synced successfully'))
  .catch((err: Error) => console.error('Error syncing database:', err));

// Middleware pour les erreurs 404 (routes inexistantes)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Route not found' });
});

// Gestion des erreurs globales
app.use(errorHandler);

// Lancer le serveur
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));