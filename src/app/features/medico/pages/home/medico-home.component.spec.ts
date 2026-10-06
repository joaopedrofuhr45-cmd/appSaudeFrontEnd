import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { MedicoHomeComponent } from './medico-home.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';
import { MedicoService } from '@features/medico/services/medico.service';

describe('MedicoHomeComponent', () => {
  let fixture: ComponentFixture<MedicoHomeComponent>;
  it('loads the doctor profile and filters consultations', async () => {
    const consulta = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['listarPorData']);
    const medico = jasmine.createSpyObj<MedicoService>('MedicoService', ['obterMeuPerfil']);
    consulta.listarPorData.and.returnValue(of([{ nomePaciente: 'João Silva', status: 'AGENDADO' }, { nomePaciente: 'Ana', status: 'CONFIRMADO' }] as any));
    medico.obterMeuPerfil.and.returnValue(of({ nome: 'Dra. Ana', especialidade: 'Pediatria' } as any));
    await TestBed.configureTestingModule({ imports: [MedicoHomeComponent], providers: [provideRouter([]), { provide: ConsultaService, useValue: consulta }, { provide: MedicoService, useValue: medico }] }).compileComponents();
    fixture = TestBed.createComponent(MedicoHomeComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    expect(component.nome).toBe('Dra. Ana');
    expect(component.carregando).toBeFalse();
    component.busca = 'joão';
    expect(component.filtradas.length).toBe(1);
    component.situacao = 'CONFIRMADO';
    expect(component.filtradas.length).toBe(0);
    expect(component.statusTexto('EM_ESPERA')).toBe('Em espera');
  });
});
