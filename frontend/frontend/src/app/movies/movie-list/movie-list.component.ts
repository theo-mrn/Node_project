import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service'; 


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true, 
  imports: [CommonModule, HttpClientModule, RouterModule], 
})


export class MovieListComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  favorites: any[] = [];
  favoriteMovies: any[] = []; 
  searchTerm: string = '';
  suggestions: any[] = []; 
  showSuggestions: boolean = false; 
  showFavorites: boolean = false; 
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
        this.updateFavoriteMovies();
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
      this.favorites.splice(index, 1); 
    } else {
      this.favorites.push(movie);
    }
    this.saveFavorites();
    this.updateFavoriteMovies(); 
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

    this.filterMovies();
  }

  selectSuggestion(suggestion: any): void {
    this.searchTerm = suggestion.series_title;
    const inputElement = document.querySelector('.search-input') as HTMLInputElement;
    inputElement.value = this.searchTerm; 
    this.showSuggestions = false;
    this.filterMovies();
  }

  hideSuggestionsWithDelay(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  toggleShowFavorites(): void {
    this.showFavorites = !this.showFavorites; 
    this.filterMovies(); 
  }

  updateFavoriteMovies(): void {
    const favoriteIds = this.favorites.map((fav) => fav.id);
    this.favoriteMovies = this.movies.filter((movie) =>
      favoriteIds.includes(movie.id)
    );
  }
}