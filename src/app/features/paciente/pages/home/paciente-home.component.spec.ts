import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { PacienteHomeComponent } from './paciente-home.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('PacienteHomeComponent', () => {
  let fixture: ComponentFixture<PacienteHomeComponent>;
  let service: jasmine.SpyObj<ConsultaService>;
  beforeEach(async () => {
    service = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['listarMinhasConsultas', 'listarEspecialidades']);
    service.listarMinhasConsultas.and.returnValue(of([]));
    service.listarEspecialidades.and.returnValue(of(['Clínica geral']));
    await TestBed.configureTestingModule({ imports: [PacienteHomeComponent], providers: [provideRouter([]), { provide: ConsultaService, useValue: service }] }).compileComponents();
    fixture = TestBed.createComponent(PacienteHomeComponent);
    fixture.detectChanges();
  });
  it('loads consultations and specialties', () => {
    expect(service.listarMinhasConsultas).toHaveBeenCalled();
    expect(fixture.componentInstance.carregando).toBeFalse();
    expect(fixture.componentInstance.especialidades).toEqual(['Clínica geral']);
  });
  it('derives upcoming and completed appointment summaries', () => {
    const future = new Date(Date.now() + 86400000).toISOString();
    fixture.componentInstance.consultas = [
      { dataHora: future, status: 'AGENDADO', especialidade: 'Cardiologia', unidade: 'Central', medico: 'Dra. Ana' },
      { dataHora: future, status: 'CONCLUIDO' },
      { dataHora: future, status: 'CANCELADO' }
    ] as any;
    expect(fixture.componentInstance.proximas.length).toBe(1);
    expect(fixture.componentInstance.totalRealizadas).toBe(1);
    expect(fixture.componentInstance.statusTexto('EM_ESPERA')).toBe('Pendente');
    expect(fixture.componentInstance.statusParaBadge('EM_ESPERA')).toBe('em-espera');
  });
  it('shows an error when consultations fail to load', () => {
    service.listarMinhasConsultas.and.returnValue(throwError(() => new Error('offline')));
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.erro).toContain('Não foi possível');
    expect(fixture.componentInstance.carregando).toBeFalse();
  });
});
