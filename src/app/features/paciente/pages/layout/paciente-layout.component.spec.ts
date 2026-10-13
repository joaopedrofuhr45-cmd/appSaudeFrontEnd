import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { PacienteLayoutComponent } from './paciente-layout.component';
import { PacienteService } from '@features/paciente/services/paciente.service';

describe('PacienteLayoutComponent', () => {
  let fixture: ComponentFixture<PacienteLayoutComponent>;
  let paciente: jasmine.SpyObj<PacienteService>;
  beforeEach(async () => {
    paciente = jasmine.createSpyObj<PacienteService>('PacienteService', ['obterMeuPerfil']);
    paciente.obterMeuPerfil.and.returnValue(of({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000' }));
    await TestBed.configureTestingModule({ imports: [PacienteLayoutComponent], providers: [provideRouter([]), { provide: PacienteService, useValue: paciente }] }).compileComponents();
    fixture = TestBed.createComponent(PacienteLayoutComponent);
    fixture.detectChanges();
  });
  it('loads the patient name and exposes the patient navigation', () => {
    expect(paciente.obterMeuPerfil).toHaveBeenCalled();
    expect(fixture.componentInstance.nomePaciente).toBe('Ana');
    expect(fixture.componentInstance.itens.map(item => item.rota)).toContain('/paciente/historico');
  });
});
