import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../service/auth/auth.service';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  loginForm: FormGroup = this.formBuilder.group({
    cpf: ['', Validators.required],
    senha: ['', Validators.required],
  });

  errorMessage: string | null = null;

  IsLoading = false;

  perfil: 'paciente' | 'atendente' | 'medico' = 'paciente';

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
      this.errorMessage = 'Preencha CPF e senha corretamente';
      return;
    }

    this.IsLoading = true;
    this.errorMessage = null;

    const { cpf, senha } = this.loginForm.value;

    this.authService
      .login({
        cpf,
        senha,
        tipoUsuario: this.perfil,
      })
      .subscribe({
        next: () => {
          this.IsLoading = false;
          this.router.navigate([`/${this.perfil}/dashboard`]);
        },
        error: (error) => {
          this.IsLoading = false;

          this.errorMessage =
            error.status === 401
              ? 'CPF ou senha inválidos'
              : 'Erro ao fazer login, tente novamente';
        },
      });
  }
}
