import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  // Fonction pour mettre à jour les champs
  updateField(field: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (!inputElement || !inputElement.value) {
      return; // Évitez les erreurs si l'événement ou la valeur est null
    }

    switch (field) {
      case 'username':
        this.username = inputElement.value;
        break;
      case 'email':
        this.email = inputElement.value;
        break;
      case 'password':
        this.password = inputElement.value;
        break;
    }
  }

  onRegister(): void {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (err) => {
        console.error('Registration error:', err);
      },
    });
  }

  onLogin(): void {
    const credentials = {
      email: this.email,
      password: this.password,
    };
  
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token); // Stocke le token JWT
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }
}
