import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthComponent } from './auth/auth.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { StatusComponent } from './status/status.component';
import { TopRatedMoviesComponent } from './charts/top-rated-movies/top-rated-movies.component'; // Import du composant



export const routes: Routes = [
  { path: '', component: LandingComponent }, 
  { path: 'auth', component: AuthComponent }, 
  { path: 'movies', component: MovieListComponent }, 
  { path: 'movies/:id', component: MovieDetailsComponent }, 
  { path: 'add',        component: AddMovieComponent },
  { path: 'movies/add', component: AddMovieComponent }, 
  { path: 'status', component: StatusComponent },
  { path: 'top-rated-movies', component: TopRatedMoviesComponent },


  
];


