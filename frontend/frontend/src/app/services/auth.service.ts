import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL du backend pour les utilisateurs

  constructor(private http: HttpClient) {}

  register(userData: { username: string; email: string; password: string; isdirector: boolean }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, userData);
  }

  updateDirectorStatus(isDirector: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-director-status`, { isDirector });
  }

  getUserRole(): Observable<{ isDirector: boolean }> {
    return this.http.get<{ isDirector: boolean }>(`${this.apiUrl}/users/is-director`);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isDirector(): Observable<{ isDirector: boolean }> {
    return this.http.get<{ isDirector: boolean }>(`${this.apiUrl}/is-director`);
  }

  
}