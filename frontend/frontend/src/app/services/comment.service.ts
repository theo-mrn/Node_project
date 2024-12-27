import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api'; // URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer les commentaires pour un film
  getCommentsForMovie(movieId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/movies/${movieId}/comments`);
  }

  // Ajouter un commentaire pour un film
  addComment(movieId: number, content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/movies/${movieId}/comments`, { content });
  }
}