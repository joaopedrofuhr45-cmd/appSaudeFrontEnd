import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../service/auth/auth.service';
import { ButtonComponent } from '../../../shared/button/button.component';
import { renderGoogleIdentityButton } from '../../../service/auth/google-identity';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  errorMessage: string | null = null;

  IsLoading = false;

  perfil: 'paciente' | 'atendente' | 'medico' = 'paciente';
  googleError: string | null = null;

  ngAfterViewInit(): void {
    void renderGoogleIdentityButton(document.getElementById('google-signin-button'), (credential) => this.entrarComGoogle(credential))
      .catch(() => { this.googleError = 'Não foi possível carregar o acesso pelo Google.'; });
  }

  ngOnInit(): void {
    const perfilDaRota = this.route.snapshot.data['perfil'];

    if (
      perfilDaRota === 'paciente' ||
      perfilDaRota === 'atendente' ||
      perfilDaRota === 'medico'
    ) {
      this.perfil = perfilDaRota;
    }
  }

  voltar(): void {
    this.router.navigate(['/menu-inicial']);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Informe um e-mail válido e sua senha';
      return;
    }

    this.IsLoading = true;
    this.errorMessage = null;

    const { email, senha } = this.loginForm.value;

    this.authService
      .login({
        email,
        senha,
      })
      .subscribe({
        next: () => {
          this.authService.me().subscribe({
            next: (me) => {
              this.IsLoading = false;
              const rotaDestino =
                me.role === 'ATENDENTE'
                  ? '/atendente/home'
                  : me.role === 'USUARIO'
                    ? '/paciente/dashboard'
                    : '/medico/dashboard';
              this.router.navigate([rotaDestino]);
            },
            error: () => {
              this.IsLoading = false;
              this.errorMessage = 'Não foi possível identificar o perfil autenticado.';
            }
          });
        },
        error: (error) => {
          this.IsLoading = false;

          this.errorMessage =
            error.status === 401
              ? 'E-mail ou senha inválidos'
              : 'Erro ao fazer login, tente novamente';
        },
      });
  }

  private entrarComGoogle(credential: string): void {
    this.IsLoading = true;
    this.googleError = null;
    this.authService.loginWithGoogle(credential).subscribe({
      next: () => this.authService.me().subscribe({
        next: (me) => {
          this.IsLoading = false;
          const destino = me.role === 'ATENDENTE' ? '/atendente/home'
            : me.role === 'USUARIO' ? '/paciente/dashboard' : '/medico/dashboard';
          this.router.navigate([destino]);
        },
        error: () => { this.IsLoading = false; this.googleError = 'Não foi possível identificar o perfil autenticado.'; },
      }),
      error: () => { this.IsLoading = false; this.googleError = 'Não foi possível entrar com Google. Tente novamente.'; },
    });
  }
}
