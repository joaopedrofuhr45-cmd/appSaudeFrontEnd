import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatCardComponent } from './stat-card.component';

describe('StatCardComponent', () => {
  let fixture: ComponentFixture<StatCardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(StatCardComponent);
  });
  it('renders its icon, value and label inputs', () => {
    Object.assign(fixture.componentInstance, { icone: 'calendar', valor: '5', label: 'Consultas' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.bubble').textContent.trim()).toBe('calendar');
    expect(fixture.nativeElement.querySelector('.valor').textContent.trim()).toBe('5');
    expect(fixture.nativeElement.querySelector('.label').textContent.trim()).toBe('Consultas');
  });
});
