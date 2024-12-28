import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl: string = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}


  

  // Méthode pour configurer les en-têtes
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }


  getTopRatedMovies(): Observable<{ series_title: string; rating: number }[]> {
    return this.http
      .get<{ series_title: string; rating: number }[]>(`${this.baseUrl}/movies/top-rated`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
  

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }

  // Récupérer tous les films
  getMovies(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/movies`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer un film par son ID
  getMovieById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/movies/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Créer un nouveau film
  createMovie(movieData: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/movies`, movieData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un film
  updateMovie(id: number, movieData: any): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/movies/${id}`, movieData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer un film
  deleteMovie(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/movies/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Noter un film
  rateMovie(movieId: number, data: { userId: number; rating: number }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/movies/${movieId}/rate`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer les commentaires d'un film
  getCommentsByMovie(movieId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/movies/${movieId}/comments`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Ajouter un commentaire à un film
  addComment(movieId: number, commentData: { content: string }): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/movies/${movieId}/comments`, commentData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer un commentaire
  deleteComment(commentId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.baseUrl}/comments/${commentId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}