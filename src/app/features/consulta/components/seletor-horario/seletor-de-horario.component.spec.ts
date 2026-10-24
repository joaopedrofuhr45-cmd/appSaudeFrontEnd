import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorHorarioComponent } from './seletor-de-horario.component';

describe('SeletorHorarioComponent', () => {
  let component: SeletorHorarioComponent;
  let fixture: ComponentFixture<SeletorHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorHorarioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeletorHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('asks for a date before showing times', () => {
    expect(fixture.nativeElement.querySelectorAll('.slot').length).toBe(0);
    expect(fixture.nativeElement.textContent).toContain('Escolha a data');
  });

  it('lists the time slots once a date is chosen and emits the clicked one', () => {
    component.data = '2099-01-01';
    fixture.detectChanges();

    const slots: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('.slot'));
    expect(slots.length).toBeGreaterThan(0);

    let escolhido = '';
    component.escolher.subscribe((h: string) => (escolhido = h));
    slots[0].click();
    expect(escolhido).toBe('08:00');
  });
});
