import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common'; // Import direct de NgIf
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [NgIf], // Inclure seulement NgIf
})
export class NavbarComponent implements OnInit {
  isDirector: boolean = false; // Détermine si l'utilisateur est un directeur
  isLoggedIn: boolean = false; // Détermine si l'utilisateur est connecté

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
    this.isLoggedIn = this.authService.isLoggedIn(); // Vérifie si l'utilisateur est connecté
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
    this.authService.logout(); // Appelle le service pour se déconnecter
    this.isLoggedIn = false; // Réinitialise l'état de connexion
    this.isDirector = false; // Réinitialise le statut de directeur
  }
}