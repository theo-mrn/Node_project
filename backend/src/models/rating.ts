import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Rating extends Model {
  public id!: number;
  public movieId!: number;
  public userId!: number;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'movies', key: 'id' },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 20 },
    },
  },
  {
    sequelize,
    tableName: 'ratings',
    timestamps: true,
  }
);

export default Rating;