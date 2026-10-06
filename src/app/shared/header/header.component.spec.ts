import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HeaderComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });
  it('shows the brand, navigation and sign-in link', () => {
    const header: HTMLElement = fixture.nativeElement;
    expect(header.textContent).toContain('Saúde+');
    expect(header.textContent).toContain('Como funciona');
    expect(header.querySelector('a[href="/menu-inicial"]')?.textContent).toContain('Entrar');
  });
});
