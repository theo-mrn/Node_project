import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  isdirector: boolean = false;
  message: string = ''; 
  isError: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentRole();
  }

  loadCurrentRole(): void {
    this.authService.isDirector().subscribe({
      next: (response) => {
        this.isdirector = response.isDirector;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du rôle utilisateur :', err);
      },
    });
  }

  toggleDirectorStatus(): void {
    const newStatus = !this.isdirector; 
    this.authService.updateSelfDirectorStatus(newStatus).subscribe({
      next: (response) => {
        this.isdirector = response.isdirector;
        this.message = `Votre rôle a été mis à jour avec succès.`;
        this.isError = false;
      },
      error: (err) => {
        this.message = 'Erreur lors de la mise à jour de votre rôle.';
        this.isError = true;
        console.error(err);
      },
    });
  }
}