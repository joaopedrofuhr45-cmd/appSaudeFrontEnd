import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { environment } from '@environment/environment';
import { apiInterceptor } from './api.interceptor';

describe('apiInterceptor', () => {
  const apiBase = environment.apiUrl.replace(/\/auth\/?$/, '');
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useValue: router },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('envia o cookie de sessão nas chamadas para a API', () => {
    http.get(`${apiBase}/consultas`).subscribe();

    const req = httpMock.expectOne(`${apiBase}/consultas`);
    expect(req.request.withCredentials).toBeTrue();
    req.flush([]);
  });

  it('envia o cookie de sessão também nas rotas /auth', () => {
    http.post(`${apiBase}/auth/login`, {}).subscribe();

    const req = httpMock.expectOne(`${apiBase}/auth/login`);
    expect(req.request.withCredentials).toBeTrue();
    req.flush(null);
  });

  it('não altera chamadas para outros domínios', () => {
    http.get('https://outro-site.com/dados').subscribe();

    const req = httpMock.expectOne('https://outro-site.com/dados');
    expect(req.request.withCredentials).toBeFalse();
    req.flush({});
  });

  it('redireciona para o menu inicial quando a sessão expira (401 fora de /auth)', () => {
    http.get(`${apiBase}/consultas`).subscribe({ error: () => undefined });

    httpMock
      .expectOne(`${apiBase}/consultas`)
      .flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(router.navigate).toHaveBeenCalledWith(['/menu-inicial']);
  });

  it('não redireciona em 401 das rotas /auth (o login trata sozinho)', () => {
    http.post(`${apiBase}/auth/login`, {}).subscribe({ error: () => undefined });

    httpMock
      .expectOne(`${apiBase}/auth/login`)
      .flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('não redireciona em outros erros, como 400 de regra de negócio', () => {
    http.patch(`${apiBase}/pacientes/me/senha`, {}).subscribe({ error: () => undefined });

    httpMock
      .expectOne(`${apiBase}/pacientes/me/senha`)
      .flush({ mensagem: 'A senha atual está incorreta.' }, { status: 400, statusText: 'Bad Request' });

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('repassa o erro para quem fez a chamada', () => {
    let status = 0;
    http.get(`${apiBase}/consultas`).subscribe({ error: (e) => (status = e.status) });

    httpMock
      .expectOne(`${apiBase}/consultas`)
      .flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(status).toBe(401);
  });
});
