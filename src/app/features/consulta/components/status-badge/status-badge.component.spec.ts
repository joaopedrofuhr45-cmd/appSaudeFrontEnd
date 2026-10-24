import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';

describe('StatusBadgeComponent', () => {
  let fixture: ComponentFixture<StatusBadgeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [StatusBadgeComponent] }).compileComponents();
    fixture = TestBed.createComponent(StatusBadgeComponent);
  });
  it('renders the selected status and label', () => {
    fixture.componentInstance.status = 'confirmado';
    fixture.componentInstance.texto = 'Confirmada';
    fixture.detectChanges();
    const badge: HTMLElement = fixture.nativeElement.querySelector('.badge');
    expect(badge.textContent?.trim()).toBe('Confirmada');
    expect(badge.classList).toContain('badge-confirmado');
  });
});
