import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { AgendarConsultaComponent } from './agendar-consulta.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('AgendarConsultaComponent', () => {
  let fixture: ComponentFixture<AgendarConsultaComponent>;
  let consulta: jasmine.SpyObj<ConsultaService>;
  beforeEach(async () => {
    consulta = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['listarEspecialidades', 'listarMedicos', 'agendar']);
    consulta.listarEspecialidades.and.returnValue(of(['Cardiologia']));
    consulta.listarMedicos.and.returnValue(of([{ id: 1, nome: 'Dra. Ana' }] as any));
    consulta.agendar.and.returnValue(of(void 0));
    await TestBed.configureTestingModule({ imports: [AgendarConsultaComponent], providers: [provideRouter([]), { provide: ConsultaService, useValue: consulta }] }).compileComponents();
    fixture = TestBed.createComponent(AgendarConsultaComponent);
    fixture.detectChanges();
  });
  it('loads specialties and doctors', () => {
    expect(fixture.componentInstance.especialidades).toEqual(['Cardiologia']);
    expect(consulta.listarMedicos).toHaveBeenCalledWith('Cardiologia');
    expect(fixture.componentInstance.medicos.length).toBe(1);
  });
  it('validates required appointment fields before submitting', () => {
    fixture.componentInstance.solicitar();
    expect(consulta.agendar).not.toHaveBeenCalled();
    expect(fixture.componentInstance.mensagem).toContain('Preencha');
  });
  it('sends a valid appointment request', () => {
    const form = fixture.componentInstance.formulario;
    form.setValue({ especialidade: 'Cardiologia', medico: 1, data: '2026-10-07', horario: '09:00', observacao: 'Retorno' });
    fixture.componentInstance.solicitar();
    expect(consulta.agendar).toHaveBeenCalledWith({ medicoId: 1, tipoConsulta: 'Cardiologia', dataHora: '2026-10-07T09:00:00', observacao: 'Retorno' });
    expect(fixture.componentInstance.mensagem).toContain('enviada');
  });
});
