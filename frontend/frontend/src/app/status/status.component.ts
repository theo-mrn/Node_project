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
        this.message = `role updated.`;
        this.isError = false;
        window.location.reload();
      },
      error: (err) => {
        this.message = 'Erreur';
        this.isError = true;
        console.error(err);
      },
    });
  }
}