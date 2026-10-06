import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { HistoricoPacienteComponent } from './historico-paciente.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('HistoricoPacienteComponent', () => {
  let fixture: ComponentFixture<HistoricoPacienteComponent>;
  let consulta: jasmine.SpyObj<ConsultaService>;
  beforeEach(async () => {
    consulta = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['listarHistorico']);
    consulta.listarHistorico.and.returnValue(of([{ id: 1 }] as any));
    await TestBed.configureTestingModule({ imports: [HistoricoPacienteComponent], providers: [provideRouter([]), { provide: ConsultaService, useValue: consulta }] }).compileComponents();
    fixture = TestBed.createComponent(HistoricoPacienteComponent);
    fixture.detectChanges();
  });
  it('loads the patient history', () => {
    expect(consulta.listarHistorico).toHaveBeenCalled();
    expect(fixture.componentInstance.registros.length).toBe(1);
    expect(fixture.componentInstance.carregando).toBeFalse();
  });
  it('shows an error and ends loading when history fails', () => {
    consulta.listarHistorico.and.returnValue(throwError(() => new Error('offline')));
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.erro).toContain('Não foi possível');
    expect(fixture.componentInstance.carregando).toBeFalse();
  });
});
