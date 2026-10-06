import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { AtendimentoMedicoComponent } from './atendimento-medico.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('AtendimentoMedicoComponent', () => {
  it('loads an appointment and finalizes it', async () => {
    const consulta = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['obter', 'finalizar']);
    consulta.obter.and.returnValue(of({ id: 5, observacao: 'Anotação' } as any));
    consulta.finalizar.and.returnValue(of({ id: 5 } as any));
    await TestBed.configureTestingModule({
      imports: [AtendimentoMedicoComponent],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '5' } } } }, { provide: ConsultaService, useValue: consulta }]
    }).compileComponents();
    const fixture: ComponentFixture<AtendimentoMedicoComponent> = TestBed.createComponent(AtendimentoMedicoComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.consulta?.id).toBe(5);
    expect(fixture.componentInstance.observacao).toBe('Anotação');
    fixture.componentInstance.finalizar();
    expect(consulta.finalizar).toHaveBeenCalledWith('5', 'Anotação');
    expect(router.navigate).toHaveBeenCalledWith(['/medico/consulta', '5']);
  });

  it('handles a missing appointment id', async () => {
    await TestBed.configureTestingModule({ imports: [AtendimentoMedicoComponent], providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }, { provide: ConsultaService, useValue: {} }] }).compileComponents();
    const fixture = TestBed.createComponent(AtendimentoMedicoComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.erro).toBe('Consulta inválida.');
    expect(fixture.componentInstance.carregando).toBeFalse();
  });
});
