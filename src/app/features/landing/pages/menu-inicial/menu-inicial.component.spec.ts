import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { MenuInicialComponent } from './menu-inicial.component';

describe('MenuInicialComponent', () => {
  it('navigates to the selected route', async () => {
    await TestBed.configureTestingModule({ imports: [MenuInicialComponent], providers: [provideRouter([])] }).compileComponents();
    const fixture = TestBed.createComponent(MenuInicialComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.resolveTo(true);
    fixture.componentInstance.irPara('/login-paciente');
    expect(router.navigate).toHaveBeenCalledWith(['/login-paciente']);
  });
});
