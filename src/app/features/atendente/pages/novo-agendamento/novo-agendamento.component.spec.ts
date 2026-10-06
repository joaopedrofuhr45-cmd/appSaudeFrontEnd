import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { NovoAgendamentoComponent } from './novo-agendamento.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('NovoAgendamentoComponent', () => {
  let fixture: ComponentFixture<NovoAgendamentoComponent>;
  let consulta: jasmine.SpyObj<ConsultaService>;
  let router: Router;
  beforeEach(async () => {
    consulta = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['listarEspecialidades', 'buscarPacientes', 'listarMedicos', 'agendar']);
    consulta.listarEspecialidades.and.returnValue(of(['Cardiologia']));
    consulta.buscarPacientes.and.returnValue(of([{ id: 3, nome: 'João' }] as any));
    consulta.listarMedicos.and.returnValue(of([{ id: 2, nome: 'Dra. Ana' }] as any));
    consulta.agendar.and.returnValue(of(void 0));
    await TestBed.configureTestingModule({ imports: [NovoAgendamentoComponent], providers: [provideRouter([]), { provide: ConsultaService, useValue: consulta }] }).compileComponents();
    fixture = TestBed.createComponent(NovoAgendamentoComponent);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture.detectChanges();
  });
  it('requires at least two characters to search a patient', () => {
    fixture.componentInstance.buscaPaciente = ' J ';
    fixture.componentInstance.buscarPaciente();
    expect(consulta.buscarPacientes).not.toHaveBeenCalled();
    expect(fixture.componentInstance.pacientes).toEqual([]);
  });
  it('searches and selects a patient', () => {
    fixture.componentInstance.buscaPaciente = 'Jo';
    fixture.componentInstance.buscarPaciente();
    expect(consulta.buscarPacientes).toHaveBeenCalledWith('Jo');
    fixture.componentInstance.selecionarPaciente({ id: 3, nome: 'João' } as any);
    expect(fixture.componentInstance.formulario.controls.pacienteId.value).toBe(3);
    expect(fixture.componentInstance.buscaPaciente).toBe('João');
  });
  it('rejects invalid appointment data and navigates after confirmation', () => {
    fixture.componentInstance.confirmar();
    expect(consulta.agendar).not.toHaveBeenCalled();
    fixture.componentInstance.formulario.setValue({ pacienteId: 3, tipoConsulta: 'Cardiologia', medicoId: 2, unidade: '', data: '2026-10-07', horario: '10:00', situacao: 'AGENDADO', observacao: '' });
    fixture.componentInstance.confirmar();
    expect(consulta.agendar).toHaveBeenCalledWith({ pacienteId: 3, medicoId: 2, tipoConsulta: 'Cardiologia', dataHora: '2026-10-07T10:00:00', observacao: '' });
    expect(router.navigate).toHaveBeenCalledWith(['/atendente/home']);
  });
});
