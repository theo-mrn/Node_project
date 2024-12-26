import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Récupérer le token JWT depuis le stockage local
  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`), // Ajouter le token dans l'en-tête Authorization
    });
    return next(clonedRequest);
  }
  return next(req); // Si pas de token, passer la requête originale
};
