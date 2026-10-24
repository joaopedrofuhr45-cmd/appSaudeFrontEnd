import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let fixture: ComponentFixture<PageHeaderComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PageHeaderComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(PageHeaderComponent);
  });
  it('uses the supplied back link and action label', () => {
    Object.assign(fixture.componentInstance, { rotaVoltar: '/paciente', textoVoltar: 'Voltar', acaoLabel: 'Agendar', acaoRota: '/agendar' });
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links[0].textContent).toContain('Voltar');
    expect(links[1].textContent).toContain('Agendar');
  });
});
