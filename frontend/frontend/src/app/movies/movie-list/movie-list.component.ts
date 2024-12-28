import { Component, OnInit } from '@angular/core'; // Pour OnInit
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Pour HttpClient
import { RouterModule, Router } from '@angular/router'; // Pour Router
import { MovieService } from '../../services/movie.service'; // Pour MovieService


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true, // Si votre projet utilise des composants standalone
  imports: [CommonModule, HttpClientModule, RouterModule], // Modules nécessaires
})


export class MovieListComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  favorites: any[] = [];
  favoriteMovies: any[] = []; // Films en favoris
  searchTerm: string = '';
  suggestions: any[] = []; // Suggestions pour l'autocomplétion
  showSuggestions: boolean = false; // Contrôle l'affichage des suggestions
  showFavorites: boolean = false; // Affiche uniquement les films favoris
  errorMessage: string | null = null;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadFavorites();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (data: any[]) => {
        this.movies = data;
        this.filteredMovies = data;
        this.updateFavoriteMovies(); // Met à jour la liste des favoris
      },
      error: (err: any) => {
        console.error('Error fetching movies:', err);
        this.errorMessage = 'Unable to fetch movies.';
      },
    });
  }

  toggleFavorite(movie: any): void {
    const index = this.favorites.findIndex((fav) => fav.id === movie.id);
    if (index > -1) {
      this.favorites.splice(index, 1); // Supprime des favoris
    } else {
      this.favorites.push(movie); // Ajoute aux favoris
    }
    this.saveFavorites();
    this.updateFavoriteMovies(); // Met à jour les films favoris
  }

  isFavorite(movie: any): boolean {
    return this.favorites.some((fav) => fav.id === movie.id);
  }

  saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  goToMovieDetails(id: number): void {
    this.router.navigate([`/movies/${id}`]);
  }

  filterMovies(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    const sourceMovies = this.showFavorites ? this.favoriteMovies : this.movies;
    this.filteredMovies = sourceMovies.filter((movie) =>
      movie.series_title.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;

    if (this.searchTerm) {
      this.suggestions = this.movies.filter((movie) =>
        movie.series_title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.suggestions = [];
    }

    this.filterMovies(); // Filtre les films affichés
  }

  selectSuggestion(suggestion: any): void {
    this.searchTerm = suggestion.series_title;
    const inputElement = document.querySelector('.search-input') as HTMLInputElement;
    inputElement.value = this.searchTerm; // Met à jour visuellement le champ
    this.showSuggestions = false; // Cache les suggestions
    this.filterMovies();
  }

  hideSuggestionsWithDelay(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200); // Laisse un délai pour les clics
  }

  toggleShowFavorites(): void {
    this.showFavorites = !this.showFavorites; // Bascule entre tous les films et les favoris
    this.filterMovies(); // Refiltrer les films
  }

  updateFavoriteMovies(): void {
    const favoriteIds = this.favorites.map((fav) => fav.id);
    this.favoriteMovies = this.movies.filter((movie) =>
      favoriteIds.includes(movie.id)
    );
  }
}