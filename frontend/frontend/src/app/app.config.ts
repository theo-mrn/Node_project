import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = [
  provideRouter(routes),
  importProvidersFrom(FormsModule),
  importProvidersFrom(RouterModule), 
];
