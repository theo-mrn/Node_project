import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [NgIf], 
})
export class NavbarComponent implements OnInit {
  isDirector: boolean = false; 
  isLoggedIn: boolean = false; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkIfLoggedIn();
    this.checkIfDirector();
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route).catch((err) => {
      console.error('Navigation error:', err);
    });
  }

  checkIfLoggedIn(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); 
  }

  checkIfDirector(): void {
    this.authService.isDirector().subscribe({
      next: (response) => {
        this.isDirector = response.isDirector;
        console.log('Navbar: Is Director:', this.isDirector);
      },
      error: (err) => {
        console.error('Erreur lors de la vérification du rôle utilisateur :', err);
      },
    });
  }

  logout(): void {
    this.authService.logout(); 
    this.isLoggedIn = false;
    this.isDirector = false;
  }
}