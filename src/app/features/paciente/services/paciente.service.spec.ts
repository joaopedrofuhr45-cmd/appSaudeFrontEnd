import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PacienteService } from './paciente.service';

describe('PacienteService', () => {
  let service: PacienteService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PacienteService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('loads the patient profile with credentials', () => {
    service.obterMeuPerfil().subscribe();
    const req = http.expectOne('http://localhost:8080/pacientes/me');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000' });
  });

  it('updates the profile', () => {
    const perfil = { nome: 'Ana', email: 'ana@example.com', telefone: '11999990000' };
    service.atualizarPerfil(perfil).subscribe();
    const req = http.expectOne('http://localhost:8080/pacientes/me');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(perfil);
    req.flush(perfil);
  });

  it('changes the password', () => {
    const dados = { senhaAtual: 'senha-atual', novaSenha: 'senha-nova' };
    service.alterarSenha(dados).subscribe();
    const req = http.expectOne('http://localhost:8080/pacientes/me/senha');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(dados);
    req.flush(null);
  });
});
