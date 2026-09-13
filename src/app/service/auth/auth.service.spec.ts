import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deve enviar CPF e senha via POST para /login com withCredentials', () => {
    service.login({ cpf: '12345678900', senha: 'minhasenha' }).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ cpf: '12345678900', senha: 'minhasenha' });
    expect(req.request.withCredentials).toBeTrue();

    req.flush(null);
  });

  it('deve enviar POST vazio para /logout', () => {
    service.logout().subscribe();

    const req = httpMock.expectOne(`${apiUrl}/logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});

    req.flush(null);
  });

  it('deve enviar GET para /me', () => {
    service.me().subscribe();

    const req = httpMock.expectOne(`${apiUrl}/me`);
    expect(req.request.method).toBe('GET');

    req.flush(null);
  });
});