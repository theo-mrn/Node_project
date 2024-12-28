import { sequelize } from './config/database';

const testConnection = async () => {
  try {
    // Test de connexion
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const [results, metadata] = await sequelize.query('SELECT * FROM movies');
    console.log('Data from movies table:', results);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close(); 
  }
};

testConnection();
