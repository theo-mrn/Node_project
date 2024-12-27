import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {}; // Détails du film
  comments: any[] = []; // Liste des commentaires
  newRating: number | null = null; // Nouvelle note
  newComment: string = ''; // Nouveau commentaire

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(movieId)) {
      this.loadMovieDetails(movieId);
      this.loadComments(movieId);
    } else {
      console.error('Invalid movie ID');
    }
  }

  loadMovieDetails(movieId: number): void {
    this.movieService.getMovieById(movieId).subscribe({
      next: (response) => {
        this.movie = response;
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      },
    });
  }



  onRatingInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    if (value >= 1 && value <= 20) {
      this.newRating = value;
    } else {
      alert('Rating must be between 1 and 20');
    }
  }

  rateMovie(): void {
    if (this.newRating !== null) {
      this.movieService.rateMovie(this.movie.id, { rating: this.newRating }).subscribe({
        next: () => {
          console.log('Rating updated successfully');
          this.movie.rating = this.newRating;
        },
        error: (err) => {
          console.error('Error updating rating:', err);
        },
      });
    } else {
      alert('Please enter a valid rating');
    }
  }

  onCommentInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.newComment = input.value.trim();
  }

  loadComments(movieId: number): void {
    this.movieService.getCommentsByMovie(movieId).subscribe({
      next: (response) => {
        this.comments = response; // Les commentaires incluent maintenant le username
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      },
    });
  }
  
  addComment(): void {
    if (this.newComment === '') {
      alert('Comment cannot be empty.');
      return;
    }
  
    this.movieService.addComment(this.movie.id, { content: this.newComment }).subscribe({
      next: (response) => {
        console.log('Comment added successfully');
        this.comments.unshift(response);
        this.newComment = '';
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      },
    });
  }

  deleteComment(commentId: number): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.movieService.deleteComment(commentId).subscribe({
        next: () => {
          this.comments = this.comments.filter((c) => c.id !== commentId);
        },
        error: (err) => {
          console.error('Error deleting comment:', err);
        },
      });
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
}