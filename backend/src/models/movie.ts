import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Movie extends Model {
  public id!: number;
  public series_title!: string;
  public released_year!: number | null;
  public certificate!: string | null;
  public runtime!: string | null;
  public genre!: string | null;
  public imdb_rating!: number | null;
  public meta_score!: number | null;
  public director!: string | null;
  public star1!: string | null;
  public star2!: string | null;
  public star3!: string | null;
  public star4!: string | null;
  public no_of_votes!: number | null;
  public gross!: number | null;
  public overview!: string | null;
  public poster_link!: string | null;
  public rating!: number | null; // Nouvelle colonne pour la note
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    series_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imdb_rating: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    meta_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    no_of_votes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gross: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    star1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    star2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    star3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    star4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    certificate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    runtime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poster_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER, // Note entre 1 et 20
      allowNull: true, // Initialisé à null
      validate: {
        min: 1,
        max: 20, // Contrôle la plage autorisée
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'movies',
  }
);

export default Movie;