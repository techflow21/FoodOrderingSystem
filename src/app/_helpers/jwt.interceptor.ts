import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AuthenticationService } from '../shared/services/authentication.service';
import { environment } from 'src/environments/environment';

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  // add auth header with jwt if user is logged in and request is to the api url
  const authService = inject(AuthenticationService);
  const user = authService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = request.url.startsWith(environment.urlAddress);

  if (isLoggedIn && isApiUrl) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${user.token}` },
    });
  }

  return next(request);
}
