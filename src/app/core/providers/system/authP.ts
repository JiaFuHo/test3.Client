import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { LoginS } from '../../services/common/login/loginS';

export const authP: HttpInterceptorFn = (LoginReq, next) => {
  const loginS = inject(LoginS);
  const router = inject(Router);

  const clientStr = localStorage.getItem('client');

  let token = '';

  if (clientStr) {
    const clientJSON = JSON.parse(clientStr);

    token = clientJSON.token || null;
  }

  let req = LoginReq;

  if (token) { req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }); }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) { // ???
        localStorage.removeItem('client');

        loginS.client.set(null);
        router.navigate(['/loginG']);
      }

      return throwError(() => err);
    })
  );
}
