import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent {
  newMovie: any = {
    series_title: '',
    released_year: null,
    certificate: '',
    runtime: '',
    genre: '',
    imdb_rating: null,
    meta_score: null,
    director: '',
    star1: '',
    star2: '',
    star3: '',
    star4: '',
    no_of_votes: null,
    gross: null,
    overview: '',
    poster_link: '',
  };

  constructor(private movieService: MovieService, private router: Router) {}

  // Met à jour les champs du formulaire
  updateField(field: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;
    const value =
      inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value.trim();
    this.newMovie[field] = value;
  }

  // Ajouter un film
  addMovie(): void {
    console.log('Adding movie:', this.newMovie); 
    this.movieService.createMovie(this.newMovie).subscribe({
      next: (response) => {
        console.log('Movie added successfully:', response);
        this.router.navigate(['/movies']); 
      },
      error: (err) => {
        console.error('Error adding movie:', err);
      },
    });
  }
}