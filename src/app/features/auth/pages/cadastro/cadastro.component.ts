
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import {CadastroService} from '@features/auth/services/cadastro.service';
import { CadastroRequest } from '@features/auth/models/cadastro-request';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { renderGoogleIdentityButton } from '@core/auth/google-identity';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroPacienteComponent implements AfterViewInit {
  private readonly fb = inject(FormBuilder);
  private readonly cadastroService = inject(CadastroService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(150)],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(72),
        ],
      ],
  });

  mensagem = '';
  enviando = false;

  ngAfterViewInit(): void {
    void renderGoogleIdentityButton(document.getElementById('google-signup-button'), (credential) => this.entrarComGoogle(credential))
      .catch(() => { this.mensagem = 'Não foi possível carregar o acesso pelo Google.'; });
  }

  campoInvalido(nome: string): boolean {
    const campo = this.cadastroForm.get(nome);
    return !!campo && campo.invalid && (campo.touched || campo.dirty);
  }

  marcarCamposComoTocados(): void {
    this.cadastroForm.markAllAsTouched();
  }

  enviar(): void {
    this.mensagem = '';
    this.marcarCamposComoTocados();

    if (this.cadastroForm.invalid) {
      this.mensagem = 'Confira os campos destacados e tente novamente.';
      return;
    }

    this.enviando = true;

    this.cadastroService.cadastrar(this.cadastroForm.value as CadastroRequest)
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          document.cookie = `cadastro_email=${encodeURIComponent(
            this.cadastroForm.get('email')?.value || '',
          )}; path=/`;

          window.location.href = '/login-paciente';
        },
        error: (erro: HttpErrorResponse) => {
          this.mensagem =
            erro.error?.message ||
            erro.message ||
            'Não foi possível concluir o cadastro.';
        },
      });
  }

  private entrarComGoogle(credential: string): void {
    this.mensagem = '';
    this.enviando = true;
    this.authService.loginWithGoogle(credential).pipe(finalize(() => (this.enviando = false))).subscribe({
      next: () => this.authService.me().subscribe({
        next: (me) => this.router.navigate([me.role === 'ATENDENTE' ? '/atendente/home' : me.role === 'USUARIO' ? '/paciente/dashboard' : '/medico/dashboard']),
        error: () => { this.mensagem = 'Não foi possível identificar o perfil autenticado.'; },
      }),
      error: (erro: HttpErrorResponse) => { this.mensagem = erro.error?.message || 'Não foi possível entrar com Google. Tente novamente.'; },
    });
  }
}
