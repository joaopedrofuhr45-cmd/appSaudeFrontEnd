import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { DadosConsultaComponent } from './dados-consulta.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('DadosConsultaComponent', () => {
  it('loads the requested appointment and opens its care page', async () => {
    const consulta = jasmine.createSpyObj<ConsultaService>('ConsultaService', ['obter']);
    consulta.obter.and.returnValue(of({ id: 9, status: 'EM_ESPERA' } as any));
    await TestBed.configureTestingModule({ imports: [DadosConsultaComponent], providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '9' } } } }, { provide: ConsultaService, useValue: consulta }] }).compileComponents();
    const fixture: ComponentFixture<DadosConsultaComponent> = TestBed.createComponent(DadosConsultaComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.consulta?.id).toBe(9);
    expect(fixture.componentInstance.statusParaBadge('EM_ESPERA')).toBe('em-espera');
    fixture.componentInstance.abrirAtendimento();
    expect(router.navigate).toHaveBeenCalledWith(['/medico/consulta', '9', 'atendimento']);
  });
});
