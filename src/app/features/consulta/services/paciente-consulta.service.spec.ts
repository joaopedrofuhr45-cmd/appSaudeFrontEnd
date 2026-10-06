import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PacienteConsultaService } from './paciente-consulta.service';

describe('PacienteConsultaService', () => {
  let service: PacienteConsultaService;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(PacienteConsultaService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());

  it('lists consultations and history', () => {
    service.listarMinhasConsultas().subscribe();
    const upcoming = http.expectOne('http://localhost:8080/consultas/paciente');
    expect(upcoming.request.withCredentials).toBeTrue();
    upcoming.flush([]);
    service.listarHistorico().subscribe();
    http.expectOne('http://localhost:8080/consultas/paciente/historico').flush([]);
  });

  it('requests a new appointment', () => {
    const dados = { especialidade: 'Clínica geral', medico: 'Dra. Ana', data: '2026-10-07', horario: '09:00', observacao: '' };
    service.solicitarAgendamento(dados).subscribe();
    const req = http.expectOne('http://localhost:8080/consultas');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dados);
    req.flush(null);
  });

  it('lists specialties and filters doctors by specialty', () => {
    service.listarEspecialidades().subscribe();
    http.expectOne('http://localhost:8080/especialidades').flush([]);
    service.listarMedicos('Pediatria').subscribe();
    const req = http.expectOne(r => r.url === 'http://localhost:8080/medicos' && r.params.get('especialidade') === 'Pediatria');
    expect(req.request.withCredentials).toBeTrue();
    req.flush([]);
  });
});
