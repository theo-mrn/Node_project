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

  // Créer un film
  createMovie(movieData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/movies`, movieData);
  }

  // Mettre à jour un film
  updateMovie(id: number, movieData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/movies/${id}`, movieData);
  }

  // Noter un film
  rateMovie(id: number, data: { rating: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/movies/${id}/rate`, data);
  }

  // Supprimer un film
  deleteMovie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/movies/${id}`);
  }

  // Récupérer un film par son ID
  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movies/${id}`);
  }

  addComment(movieId: number, commentData: { content: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/movies/${movieId}/comments`, commentData);
  }
  
  getCommentsByMovie(movieId: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/movies/${movieId}/comments`);
  }

  // Supprimer un commentaire par son ID
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/comments/${commentId}`);
  }
}