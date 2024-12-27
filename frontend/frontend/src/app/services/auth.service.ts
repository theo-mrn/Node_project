import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL du backend pour les utilisateurs

  constructor(private http: HttpClient) {}

  // Inscription
  register(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  updateDirectorStatus(isDirector: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-director-status`, { isDirector });
  }

  // Connexion
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
