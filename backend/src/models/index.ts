import { User } from './user';
import { Movie } from './movie';
import { Favorite } from './favorite';

// Configurer les relations
User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

Movie.hasMany(Favorite, { foreignKey: 'movieId', onDelete: 'CASCADE' });
Favorite.belongsTo(Movie, { foreignKey: 'movieId' });