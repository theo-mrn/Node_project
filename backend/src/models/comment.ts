import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Comment extends Model {
  public id!: number;
  public movieId!: number;
  public content!: string;
  public userId!: number | null;
  public username!: string | null; // Peut être null
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Peut être null
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true, // Peut être null
    },
  },
  {
    sequelize,
    tableName: 'comments',
  }
);

export default Comment;