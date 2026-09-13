import { AuthService } from './../../../service/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    cpf: ['', Validators.required],
    senha: ['', Validators.required],
  });

  errorMessage: string | null = null;
  IsLoading = false;
  perfil: 'paciente' | 'atendente' | 'medico' = 'paciente';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.perfil = this.route.snapshot.data['perfil'];
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha CPF e senha corretamente';
      return;
    }

    this.IsLoading = true;
    this.errorMessage = null;

    const { cpf, senha } = this.loginForm.value;
    this.authService.login({ cpf, senha }).subscribe({
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
