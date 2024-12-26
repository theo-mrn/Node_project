import { Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';


export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirige vers /auth par défaut
  { path: 'auth', component: AuthComponent }, // Page de connexion
  { path: 'movies', component: MovieListComponent }, // Liste des films
  { path: 'movies/:id', component: MovieDetailsComponent }, // Détails d'un film  
  { path: 'add', component: AddMovieComponent },
  { path: 'movies/add', component: AddMovieComponent }, // Nouvelle route


  
];


