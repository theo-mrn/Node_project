import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajoutez RouterModule ici

})
export class MovieListComponent implements OnInit {
  movies: any[] = []; // Contiendra les films récupérés depuis l'API
  errorMessage: string | null = null; // Pour gérer les erreurs

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies(); // Charger les films lors de l'initialisation
  }


  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data; // Stocke les films récupérés
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.errorMessage = 'Unable to fetch movies.';
      },
    });
  }
}
