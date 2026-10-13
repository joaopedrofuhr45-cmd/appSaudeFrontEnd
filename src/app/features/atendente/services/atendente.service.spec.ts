import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AtendenteService } from './atendente.service';

describe('AtendenteService', () => {
  let service: AtendenteService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AtendenteService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('loads and updates the attendant profile', () => {
    service.obterMeuPerfil().subscribe();
    const get = http.expectOne('http://localhost:8080/atendentes/me');
    expect(get.request.method).toBe('GET');
    expect(get.request.withCredentials).toBeTrue();
    get.flush({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000', setor: 'Recepção' });
    const perfil = { nome: 'Ana', email: 'ana@example.com', telefone: '11999990000' };
    service.atualizarPerfil(perfil).subscribe();
    const put = http.expectOne('http://localhost:8080/atendentes/me');
    expect(put.request.method).toBe('PUT');
    expect(put.request.body).toEqual(perfil);
    put.flush({ ...perfil, setor: 'Recepção' });
  });

  it('changes the attendant password', () => {
    const dados = { senhaAtual: 'atual', novaSenha: 'nova' };
    service.alterarSenha(dados).subscribe();
    const req = http.expectOne('http://localhost:8080/atendentes/me/senha');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(dados);
    req.flush(null);
  });
});
