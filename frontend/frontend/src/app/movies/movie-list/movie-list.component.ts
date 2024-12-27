import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = []; // Liste des favoris
  errorMessage: string | null = null;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadFavorites(); // Charger les favoris depuis le localStorage
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.errorMessage = 'Unable to fetch movies.';
      },
    });
  }

  // Ajouter ou supprimer des favoris
  toggleFavorite(movie: any): void {
    const index = this.favorites.findIndex((fav) => fav.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1); // Retirer des favoris
    } else {
      this.favorites.push(movie); // Ajouter aux favoris
    }
    this.saveFavorites(); // Sauvegarder dans le localStorage
  }

  // Vérifie si un film est dans les favoris
  isFavorite(movie: any): boolean {
    return this.favorites.some((fav) => fav.id === movie.id);
  }

  // Sauvegarder les favoris dans le localStorage
  saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // Charger les favoris depuis le localStorage
  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  goToMovieDetails(id: number): void {
    this.router.navigate([`/movies/${id}`]);
  }
}