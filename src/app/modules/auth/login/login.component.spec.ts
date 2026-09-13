import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../service/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { data: { perfil: 'paciente' } } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve navegar para o dashboard quando o login der certo', () => {
    authServiceSpy.login.and.returnValue(of(undefined));

    component.loginForm.setValue({ cpf: '12345678900', senha: 'minhasenha' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ cpf: '12345678900', senha: 'minhasenha', tipoUsuario: 'paciente'});
    expect(router.navigate).toHaveBeenCalledWith(['/paciente/dashboard']);
    expect(component.errorMessage).toBeNull();
    expect(component.IsLoading).toBeFalse();
  });

  it('deve mostrar mensagem de erro quando o login falhar', () => {
    authServiceSpy.login.and.returnValue(throwError(() => ({ status: 401 })));

    component.loginForm.setValue({ cpf: '12345678900', senha: 'senhaerrada' });
    component.onSubmit();

    expect(component.errorMessage).toBe('CPF ou senha inválidos');
    expect(component.IsLoading).toBeFalse();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});