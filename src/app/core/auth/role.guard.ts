import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = (route.data['roles'] ?? []) as string[];

  return auth.me().pipe(
    map(me => roles.length === 0 || roles.includes(me.role)
      ? true
      : router.createUrlTree(['/menu-inicial'])),
    catchError(() => of(router.createUrlTree(['/menu-inicial'])))
  );
};