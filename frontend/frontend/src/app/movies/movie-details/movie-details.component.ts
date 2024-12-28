import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {}; 
  comments: any[] = []; 
  newRating: number | null = null; 
  newComment: string = ''; 
  editing: boolean = false; 
  isDirector: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService, 
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
    this.checkIfDirector(); 
  }
  checkIfDirector(): void {
    this.authService.isDirector().subscribe({
      next: (response) => {
        this.isDirector = response.isDirector;
      },
      error: (err) => {
        console.error('Erreur lors de la vérification du rôle utilisateur :', err);
      },
    });
  }


  goBack(): void {
    this.router.navigate(['/movies']);
  }

  getRatingWidth(rating: number | null): number {
    return rating ? (rating / 10) * 100 : 0;
  }
  
  getRatingColor(rating: number | null): string {
    if (!rating) return '#ccc'; 
    if (rating >= 8) return '#4caf50';
    if (rating >= 5) return '#ffeb3b'; 
    return '#f44336'; 
  }


  // Charger les détails du film
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

  // Charger les commentaires
  loadComments(movieId: number): void {
    this.movieService.getCommentsByMovie(movieId).subscribe({
      next: (response) => {
        this.comments = response;
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
      },
    });
  }

  // Basculer entre le mode édition et visualisation
  toggleEditMode(): void {
    this.editing = !this.editing;
  }

  // Mettre à jour un champ du film
  updateField(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.movie[field] = input.value.trim();
  }

  // Enregistrer les modifications du film
  saveChanges(): void {
    this.movieService.updateMovie(this.movie.id, this.movie).subscribe({
      next: (response) => {
        console.log('Movie updated successfully:', response);
        this.movie = response;
        this.editing = false;
      },
      error: (err) => {
        console.error('Error updating movie:', err);
      },
    });
  }

  // Gérer l'entrée de la note
  onRatingInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    if (value >= 0 && value <= 10) {
      this.newRating = value;
    } else {
      alert('Rating must be between 1 and 10');
    }
  }

  rateMovie(): void {
    if (this.newRating !== null) {
      this.movieService.rateMovie(this.movie.id, { userId: 1, rating: this.newRating }).subscribe({
        next: (response) => {
          console.log('Rating added successfully:', response);
          this.movie.rating = response.avgRating; 
        },
        error: (err) => {
          console.error('Error adding rating:', err);
        },
      });
    } else {
      alert('Please enter a valid rating.');
    }
  }

  // Gérer l'entrée du commentaire
  onCommentInput(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.newComment = input.value.trim();
  }

  // Ajouter un commentaire
  addComment(): void {
    if (this.newComment.trim() === '') {
      alert('Comment cannot be empty.');
      return;
    }

    const commentData = {
      movieId: this.movie.id,
      content: this.newComment,
    };

    this.movieService.addComment(this.movie.id, commentData).subscribe({
      next: (response) => {
        console.log('Comment added successfully:', response);
        this.comments.unshift(response); 
        this.newComment = '';
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      },
    });
  }

  // Supprimer un commentaire
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

  // Supprimer un film
  deleteMovie(): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          console.log('Movie deleted successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting movie:', err);
        },
      });
    }
  }
}