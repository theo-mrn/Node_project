import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

declare var google: any; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private googleClientId = '294130312954-h4fljdvi8o7gklofrmpueismo0ujifch.apps.googleusercontent.com'; 

  constructor(private http: HttpClient, private router: Router) {}

  // Inscription utilisateur
  register(userData: { username: string; email: string; password: string; isdirector: boolean }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, userData);
  }

  // Connexion utilisateur
  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  // Déconnexion utilisateur
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  // Vérification si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Vérification du rôle utilisateur (director ou non)
  isDirector(): Observable<{ isDirector: boolean }> {
    return this.http.get<{ isDirector: boolean }>(`${this.apiUrl}/is-director`);
  }

  // Initialisation OAuth avec Google
  initializeGoogleSignIn(): void {
    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: (response: any) => this.handleGoogleSignIn(response),
    });

    // Ajoutez le bouton de connexion Google dans le composant
    const buttonElement = document.getElementById('google-signin-btn');
    if (buttonElement) {
      google.accounts.id.renderButton(buttonElement, {
        theme: 'outline',
        size: 'large',
      });
    } else {
      console.error('Element with id "google-signin-btn" not found in the DOM.');
    }
  }

  // Mise à jour du statut de directeur
  updateSelfDirectorStatus(isdirector: boolean): Observable<{ isdirector: boolean }> {
    return this.http.put<{ isdirector: boolean }>(`${this.apiUrl}/update-director-status`, { isdirector });
  }

  // Gestion de la connexion Google
  private handleGoogleSignIn(response: any): void {
    const googleToken = response.credential; 
    console.log('Google Token:', googleToken);
  
    this.http.post<{ token: string }>(`${this.apiUrl}/google-login`, { token: googleToken }).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('token', res.token); 
          this.router.navigate(['/movies']); 
        } else {
          console.error('No token received from backend');
        }
      },
      error: (err) => {
        console.error('Google sign-in failed:', err);
      },
    });
  }
}