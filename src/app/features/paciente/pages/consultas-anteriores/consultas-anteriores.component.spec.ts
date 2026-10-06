import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ConsultasAnterioresComponent } from './consultas-anteriores.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('ConsultasAnterioresComponent', () => {
  let fixture: ComponentFixture<ConsultasAnterioresComponent>;
  beforeEach(async () => {
    const consulta = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['listarMinhasConsultas']);
    consulta.listarMinhasConsultas.and.returnValue(of([]));
    await TestBed.configureTestingModule({ imports: [ConsultasAnterioresComponent], providers: [provideRouter([]), { provide: ConsultaService, useValue: consulta }] }).compileComponents();
    fixture = TestBed.createComponent(ConsultasAnterioresComponent);
    fixture.detectChanges();
  });
  it('maps statuses and cancelled appointment styles', () => {
    expect(fixture.componentInstance.statusTexto('CONCLUIDO')).toBe('Concluída');
    expect(fixture.componentInstance.statusParaBadge('EM_ESPERA')).toBe('em-espera');
    expect(fixture.componentInstance.classe('CANCELADO')).toBe('vermelho');
    expect(fixture.componentInstance.classe('CONCLUIDO')).toBe('verde');
  });
  it('filters past completed consultations by doctor name', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    fixture.componentInstance.consultas = [
      { medico: 'Dra. Ana', especialidade: 'Pediatria', dataHora: yesterday, status: 'CONCLUIDO' },
      { medico: 'Dr. João', especialidade: 'Clínica', dataHora: yesterday, status: 'CANCELADO' }
    ] as any;
    fixture.componentInstance.busca = 'ana';
    expect(fixture.componentInstance.filtradas.length).toBe(1);
    expect(fixture.componentInstance.filtradas[0].medico).toBe('Dra. Ana');
  });
});
