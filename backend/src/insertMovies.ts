import { sequelize } from './config/database'; 
import { Movie } from './models/movie'; 
import fs from 'fs';
import csvParser from 'csv-parser';

// Définir le type des données provenant du CSV
type MovieData = {
  Poster_Link: string;
  Series_Title: string;
  Released_Year: string;
  Certificate: string;
  Runtime: string;
  Genre: string;
  IMDB_Rating: string;
  Overview: string;
  Meta_score: string;
  Director: string;
  Star1: string;
  Star2: string;
  Star3: string;
  Star4: string;
  No_of_Votes: string;
  Gross: string;
};

const insertMovies = async () => {
  try {
    const results: MovieData[] = [];

    // Lire le fichier CSV
    fs.createReadStream('imdb_top_1000.csv')
      .pipe(csvParser())
      .on('data', (data: MovieData) => results.push(data))
      .on('end', async () => {
        // Insérer les données dans la base de données
        for (const row of results) {
          await Movie.create({
            poster_link: row.Poster_Link,
            series_title: row.Series_Title,
            released_year: parseInt(row.Released_Year) || null,
            certificate: row.Certificate,
            runtime: row.Runtime,
            genre: row.Genre,
            imdb_rating: parseFloat(row.IMDB_Rating) || null,
            overview: row.Overview,
            meta_score: parseInt(row.Meta_score) || null,
            director: row.Director,
            star1: row.Star1,
            star2: row.Star2,
            star3: row.Star3,
            star4: row.Star4,
            no_of_votes: parseInt(row.No_of_Votes.replace(/,/g, '')) || null, 
            gross: row.Gross ? parseInt(row.Gross.replace(/,/g, '')) : null, 
          });
        }
        console.log('Movies successfully inserted!');
        process.exit();
      });
  } catch (err) {
    console.error('Error inserting movies:', err);
  }
};

insertMovies();
