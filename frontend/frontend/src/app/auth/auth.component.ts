import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  registerData: Record<'username' | 'email' | 'password', string> & { isdirector: boolean } = {
    username: '',
    email: '',
    password: '',
    isdirector: false, // Ajout du champ isdirector
  };

  loginData: Record<'email' | 'password', string> = {
    email: '',
    password: '',
  };

  message: string = ''; // Message pour afficher les résultats à l'utilisateur
  isError: boolean = false; // Indique si le message est une erreur

  constructor(private authService: AuthService) {}

  updateField(
    form: 'register' | 'login',
    field: 'username' | 'email' | 'password' | 'isdirector',
    event: Event
  ): void {
    const inputElement = event.target as HTMLInputElement;

    if (!inputElement) return;

    if (form === 'register') {
      if (field === 'isdirector') {
        this.registerData[field] = inputElement.checked; // Gestion du champ isdirector (case à cocher)
      } else {
        this.registerData[field] = inputElement.value;
      }
    } else if (form === 'login' && (field === 'email' || field === 'password')) {
      this.loginData[field] = inputElement.value;
    }
  }

  onRegister(): void {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.message = 'Registration successful!';
        this.isError = false;
        console.log(response);
      },
      error: (err) => {
        this.message = 'Registration failed. Please try again.';
        this.isError = true;
        console.error(err);
      },
    });
  }

  onLogin(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.message = 'Login successful!';
        this.isError = false;
        localStorage.setItem('token', response.token); // Stocke le token JWT
        console.log(response);
      },
      error: (err) => {
        this.message = 'Login failed. Please check your credentials.';
        this.isError = true;
        console.error(err);
      },
    });
  }
}