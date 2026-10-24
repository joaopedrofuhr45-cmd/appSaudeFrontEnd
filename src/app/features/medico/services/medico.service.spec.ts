import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MedicoService } from './medico.service';

describe('MedicoService', () => {
  let service: MedicoService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(MedicoService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('loads and updates the doctor profile', () => {
    service.obterMeuPerfil().subscribe();
    const get = http.expectOne('http://localhost:8080/medicos/me');
    expect(get.request.method).toBe('GET');
    get.flush({ nome: 'Dr. Silva' });
    const perfil = { nome: 'Dr. Silva', email: 'dr@example.com', telefone: '11999990000' };
    service.atualizarPerfil(perfil).subscribe();
    const put = http.expectOne('http://localhost:8080/medicos/me');
    expect(put.request.method).toBe('PUT');
    expect(put.request.body).toEqual(perfil);
    put.flush(perfil);
  });

  it('changes the doctor password', () => {
    const dados = { senhaAtual: 'atual', novaSenha: 'nova' };
    service.alterarSenha(dados).subscribe();
    const req = http.expectOne('http://localhost:8080/medicos/me/senha');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(dados);
    req.flush(null);
  });

  it('lists the doctor agenda for a date under /medicos/me/consultas', () => {
    service.listarAgenda('2026-10-06').subscribe();
    const req = http.expectOne(r => r.url === 'http://localhost:8080/medicos/me/consultas' && r.params.get('data') === '2026-10-06');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
