import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule]
})
export class AuthComponent {
  selectedTab: 'register' | 'login' = 'register'; // Onglet sélectionné

  registerData: Record<'username' | 'email' | 'password', string> & { isdirector: boolean } = {
    username: '',
    email: '',
    password: '',
    isdirector: false,
  };

  loginData: Record<'email' | 'password', string> = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    this.authService.initializeGoogleSignIn();
    
  }

  message: string = '';
  isError: boolean = false; 
  constructor(private authService: AuthService, private router: Router) {} 

  updateField(
    form: 'register' | 'login',
    field: 'username' | 'email' | 'password' | 'isdirector',
    event: Event
  ): void {
    const inputElement = event.target as HTMLInputElement;

    if (!inputElement) return;

    if (form === 'register') {
      if (field === 'isdirector') {
        this.registerData[field] = inputElement.checked;
      } else {
        this.registerData[field] = inputElement.value;
      }
    } else if (form === 'login' && (field === 'email' || field === 'password')) {
      this.loginData[field] = inputElement.value;
    }
  }

  selectTab(tab: 'register' | 'login'): void {
    this.selectedTab = tab;
  }

  

  onRegister(): void {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.message = 'Registration successful!';
        this.isError = false;

        // Stocke le token dans localStorage
        localStorage.setItem('token', response.token);

        // Redirige vers /movies après inscription
        this.router.navigate(['/movies']);
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

        // Stocke le token dans localStorage
        localStorage.setItem('token', response.token);

        // Redirige vers /movies après connexion
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        this.message = 'Login failed. Please check your credentials.';
        this.isError = true;
        console.error(err);
      },
    });
  }
}