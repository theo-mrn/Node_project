import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthComponent } from './auth/auth.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { StatusComponent } from './status/status.component';



export const routes: Routes = [
  { path: '', component: LandingComponent }, // Route de la landing page
  { path: 'auth', component: AuthComponent }, // Page de connexion
  { path: 'movies', component: MovieListComponent }, // Liste des films
  { path: 'movies/:id', component: MovieDetailsComponent }, // Détails d'un film  
  { path: 'add',        component: AddMovieComponent },
  { path: 'movies/add', component: AddMovieComponent }, // Nouvelle route
  { path: 'status', component: StatusComponent },



  
];


