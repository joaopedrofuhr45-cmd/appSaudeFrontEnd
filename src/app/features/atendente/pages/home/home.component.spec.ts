import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

import { AtendenteHomeComponent } from './home.component';
import { AtendenteService } from '@features/atendente/services/atendente.service';
import { ConsultaService } from '@features/consulta/services/consulta.service';

describe('AtendenteHomeComponent', () => {
  let component: AtendenteHomeComponent;
  let fixture: ComponentFixture<AtendenteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtendenteHomeComponent],
      providers: [
        provideRouter([]),
        { provide: AtendenteService, useValue: { obterMeuPerfil: () => of({ nome: 'Ana', setor: 'Recepção' }) } },
        { provide: ConsultaService, useValue: { listarPorData: () => of([]) } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtendenteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
