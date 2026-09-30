import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';

import { LoginS } from '../../services/common/login/loginS';
import { ToastP } from '../common/toastP';

export const authP: HttpInterceptorFn = (LoginReq, next) => {
  const router = inject(Router);

  const loginS = inject(LoginS);
  const toastP = inject(ToastP);

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
      if (err.status === 401) {
        localStorage.removeItem('client');

        router.navigate(['/loginG']);
        loginS.client.set(null);
        toastP.tWarn('請重新登入');

        return EMPTY;
      }

      return throwError(() => err);
    })
  );
}
