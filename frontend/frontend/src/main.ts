import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/interceptors/auth.interceptor'; // Intercepteur d'authentification
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Injection des routes
    provideHttpClient(withInterceptors([authInterceptor])), // Intercepteur HTTP
  ],
}).catch((err) => console.error(err));
