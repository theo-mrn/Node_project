import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl: string = 'http://localhost:3000'; // Assurez-vous que cela correspond à votre API

  constructor(private http: HttpClient) {}

  // Récupérer tous les films
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/movies`);
  }

  // Récupérer un film par son ID
  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/${id}`);
  }

  // Créer un nouveau film
  createMovie(movieData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/movies`, movieData);
  }

  // Mettre à jour un film
  updateMovie(id: number, movieData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/movies/${id}`, movieData);
  }

  // Supprimer un film
  deleteMovie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/movies/${id}`);
  }


  rateMovie(movieId: number, ratingData: { userId: number; rating: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/movies/${movieId}/rate`, ratingData);
  }

  // Récupérer les commentaires d'un film
  getCommentsByMovie(movieId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/movies/${movieId}/comments`);
  }

  // Ajouter un commentaire à un film
 
  addComment(movieId: number, commentData: { content: string }): Observable<any> {
    console.log("hueirozhdrzio");
    return this.http.post<any>(`${this.baseUrl}/movies/${movieId}/comments`, commentData);
  }

  // Supprimer un commentaire
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/comments/${commentId}`);
  }
}