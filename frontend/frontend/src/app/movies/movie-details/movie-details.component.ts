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
  editing: boolean = false; // Indique si le mode édition est activé

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
        this.editing = false; // Désactiver le mode édition
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

    if (value >= 1 && value <= 20) {
      this.newRating = value;
    } else {
      alert('Rating must be between 1 and 20');
    }
  }

  rateMovie(): void {
    if (this.newRating !== null) {
      this.movieService.rateMovie(this.movie.id, { userId: 1, rating: this.newRating }).subscribe({
        next: (response) => {
          console.log('Rating added successfully:', response);
          this.movie.rating = response.avgRating; // Affiche la nouvelle moyenne
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
      movieId: this.movie.id, // Vérifiez que this.movie.id est correctement défini
      content: this.newComment,
    };
  
    console.log('Sending comment:', commentData);
  
    this.movieService.addComment(this.movie.id, commentData).subscribe({
      next: (response) => {
        console.log('Comment added successfully:', response);
        this.comments.unshift(response); // Ajoute le commentaire en début de liste
        this.newComment = ''; // Réinitialise le champ commentaire
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