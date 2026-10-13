import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaRowComponent } from './consulta-row.component';

describe('ConsultaRowComponent', () => {
  let fixture: ComponentFixture<ConsultaRowComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ConsultaRowComponent] }).compileComponents();
    fixture = TestBed.createComponent(ConsultaRowComponent);
  });
  it('renders appointment details and highlight state', () => {
    Object.assign(fixture.componentInstance, { horario: '09:30', nome: 'João', detalhe: 'Cardiologia', status: 'agendado', statusTexto: 'Agendada', destaque: true });
    fixture.detectChanges();
    const row: HTMLElement = fixture.nativeElement.querySelector('.row');
    expect(row.textContent).toContain('09:30');
    expect(row.textContent).toContain('João');
    expect(row.textContent).toContain('Cardiologia');
    expect(row.classList).toContain('destaque');
  });
});
