import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SidebarComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(SidebarComponent);
  });
  it('renders the profile, menu links and logout destination', () => {
    Object.assign(fixture.componentInstance, { nome: 'Ana', subtitulo: 'Paciente', itens: [{ label: 'Início', rota: '/paciente' }], rotaLogout: '/sair' });
    fixture.detectChanges();
    const aside: HTMLElement = fixture.nativeElement;
    expect(aside.textContent).toContain('Ana');
    expect(aside.textContent).toContain('Paciente');
    expect(aside.textContent).toContain('Início');
    expect(aside.querySelector('.sair')?.textContent).toContain('Sair da conta');
  });
});
