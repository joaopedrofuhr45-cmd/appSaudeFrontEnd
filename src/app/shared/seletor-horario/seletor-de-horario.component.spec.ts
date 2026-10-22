import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeletorDeHorarioComponent } from './seletor-de-horario.component';

describe('SeletorDeHorarioComponent', () => {
  let component: SeletorDeHorarioComponent;
  let fixture: ComponentFixture<SeletorDeHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeletorDeHorarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeletorDeHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
