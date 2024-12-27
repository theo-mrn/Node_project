import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent {
  isDirector: boolean = false;

  constructor(private authService: AuthService) {}

  onIsDirectorChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Assurez-vous que c'est un élément HTMLInput
    this.isDirector = target.checked; // Utilisez la propriété 'checked' de l'élément
  }

  
  updateStatus() {
    this.authService.updateDirectorStatus(this.isDirector).subscribe({
      next: () => {
        alert('Statut mis à jour avec succès !');
      },
      error: (error) => {
        alert('Erreur lors de la mise à jour du statut.');
        console.error(error);
      },
    });
  }
}