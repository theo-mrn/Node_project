import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
    timestamps: true,
  }
);

export default Favorite;