import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsultaService } from './consulta.service';

describe('ConsultaService', () => {
  let service: ConsultaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ConsultaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('is created', () => expect(service).toBeTruthy());

  it('lists consultations for a date', () => {
    service.listarPorData('2026-10-06').subscribe();
    const req = http.expectOne(r => r.url === 'http://localhost:8080/consultas' && r.params.get('data') === '2026-10-06');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush([]);
  });

  it('gets a consultation by id', () => {
    service.obter(12).subscribe();
    const req = http.expectOne('http://localhost:8080/consultas/12');
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('finalizes a consultation with its note', () => {
    service.finalizar(12, 'Atendido').subscribe();
    const req = http.expectOne('http://localhost:8080/consultas/12/finalizar');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ observacao: 'Atendido' });
    req.flush({});
  });

  it('lists patient consultations and history', () => {
    service.listarMinhasConsultas().subscribe();
    const consultations = http.expectOne('http://localhost:8080/consultas/paciente');
    expect(consultations.request.withCredentials).toBeTrue();
    consultations.flush([]);
    service.listarHistorico().subscribe();
    http.expectOne('http://localhost:8080/consultas/paciente/historico').flush([]);
  });

  it('creates a consultation', () => {
    const data = { medicoId: 4, tipoConsulta: 'Cardiologia', dataHora: '2026-10-07T09:00:00', observacao: '' };
    service.agendar(data).subscribe();
    const req = http.expectOne('http://localhost:8080/consultas');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(null);
  });

  it('lists specialties and doctors with an optional filter', () => {
    service.listarEspecialidades().subscribe();
    http.expectOne('http://localhost:8080/especialidades').flush([]);
    service.listarMedicos('Cardiologia').subscribe();
    const req = http.expectOne(r => r.url === 'http://localhost:8080/medicos' && r.params.get('especialidade') === 'Cardiologia');
    req.flush([]);
    service.listarMedicos().subscribe();
    const unfiltered = http.expectOne('http://localhost:8080/medicos');
    expect(unfiltered.request.params.has('especialidade')).toBeFalse();
    unfiltered.flush([]);
  });

  it('searches patients by name', () => {
    service.buscarPacientes('Maria').subscribe();
    const req = http.expectOne(r => r.url === 'http://localhost:8080/pacientes' && r.params.get('nome') === 'Maria');
    expect(req.request.method).toBe('GET');
    expect(req.request.withCredentials).toBeTrue();
    req.flush([]);
  });
});
