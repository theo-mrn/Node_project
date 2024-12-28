import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Comment extends Model {
  public id!: number;
  public movieId!: number;
  public content!: string;
  public userId!: number | null;
  public username!: string | null; 
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
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'comments',
  }
);

export default Comment;