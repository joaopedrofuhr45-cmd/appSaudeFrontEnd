import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { environment } from '@environment/environment';

/** Raiz da API (sem o /auth), igual à usada pelos services. */
const API_BASE = environment.apiUrl.replace(/\/auth\/?$/, '');

/**
 * - Envia o cookie de sessão (JWT HttpOnly) em toda chamada para a nossa API.
 * - Se a sessão expirar (401) fora das rotas /auth, manda o usuário para o menu inicial.
 *   As rotas /auth ficam de fora porque o login trata o 401 (credenciais inválidas) sozinho.
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(API_BASE)) {
    return next(req);
  }

  const router = inject(Router);
  const ehRotaDeAuth = req.url.startsWith(`${API_BASE}/auth/`);

  return next(req.clone({ withCredentials: true })).pipe(
    catchError((erro: unknown) => {
      if (erro instanceof HttpErrorResponse && erro.status === 401 && !ehRotaDeAuth) {
        router.navigate(['/menu-inicial']);
      }
      return throwError(() => erro);
    })
  );
};
