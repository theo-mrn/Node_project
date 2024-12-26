import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router

  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(movieId)) {
      this.movieService.getMovieById(movieId).subscribe({
        next: (response) => {
          this.movie = response;
        },
        error: (err) => {
          console.error('Error fetching movie details:', err);
        },
      });
    } else {
      console.error('Invalid movie ID');
    }
  }

  deleteMovie(): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          console.log('Movie deleted successfully');
          this.router.navigate(['/']); // Redirige vers la liste des films
        },
        error: (err) => {
          console.error('Error deleting movie:', err);
        },
      });
    }
  }

  updateField(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.movie[field] = input.value; // Met à jour la propriété correspondante de l'objet `movie`
  }

  saveChanges(): void {
    const movieId = this.movie.id;
    this.movieService.updateMovie(movieId, this.movie).subscribe({
      next: (response) => {
        console.log('Movie updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating movie:', err);
      },
    });
  }
}
