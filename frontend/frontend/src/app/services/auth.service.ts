import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient, private router: Router) {}

  // Inscription avec récupération du token
  register(userData: { username: string; email: string; password: string; isdirector: boolean }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, userData);
  }

  // Connexion utilisateur
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  // Vérification si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  // Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/auth']); 
  }

  // Vérification du rôle (director ou non)
  isDirector(): Observable<{ isDirector: boolean }> {
    return this.http.get<{ isDirector: boolean }>(`${this.apiUrl}/is-director`);
  }

  updateSelfDirectorStatus(isdirector: boolean): Observable<{ isdirector: boolean }> {
    return this.http.put<{ isdirector: boolean }>(`${this.apiUrl}/update-director-status`, { isdirector });
  }

  // Récupérer le rôle utilisateur (alternative)
  getUserRole(): Observable<{ isDirector: boolean }> {
    return this.http.get<{ isDirector: boolean }>(`${this.apiUrl}/is-director`);
  }
}