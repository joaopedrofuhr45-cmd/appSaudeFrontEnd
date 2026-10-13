import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { firstValueFrom, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { roleGuard } from './role.guard';

describe('roleGuard', () => {
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  const redirect = {} as UrlTree;
  const route = (roles: string[] = []) => ({ data: { roles } } as unknown as ActivatedRouteSnapshot);

  beforeEach(() => {
    auth = jasmine.createSpyObj<AuthService>('AuthService', ['me']);
    router = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    router.createUrlTree.and.returnValue(redirect);
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: auth }, { provide: Router, useValue: router }] });
  });

  it('allows a user whose role is permitted', async () => {
    auth.me.and.returnValue(of({ role: 'MEDICO' } as any));
    const result = TestBed.inject(EnvironmentInjector).runInContext(() => roleGuard(route(['MEDICO']), {} as RouterStateSnapshot));
    expect(await firstValueFrom(result as any)).toBeTrue();
  });

  it('redirects a user with a disallowed role', async () => {
    auth.me.and.returnValue(of({ role: 'PACIENTE' } as any));
    const result = TestBed.inject(EnvironmentInjector).runInContext(() => roleGuard(route(['MEDICO']), {} as RouterStateSnapshot));
    expect(await firstValueFrom(result as any)).toBe(redirect);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/menu-inicial']);
  });

  it('redirects when the session lookup fails', async () => {
    auth.me.and.returnValue(throwError(() => new Error('offline')));
    const result = TestBed.inject(EnvironmentInjector).runInContext(() => roleGuard(route(), {} as RouterStateSnapshot));
    expect(await firstValueFrom(result as any)).toBe(redirect);
  });
});
