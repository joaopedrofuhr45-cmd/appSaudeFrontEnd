
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';

import {CadastroService} from '../../../service/cadastro/cadastro.service';
import { CadastroRequest } from './../../../model/auth/cadastro-request';

function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = String(control.value ?? '').replace(/\D/g, '');

  if (!cpf) return null;

  return cpf.length === 11 && !/^([0-9])\1{10}$/.test(cpf)
    ? null
    : { cpfInvalido: true };
}

function senhasIguaisValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const senha = control.get('senha')?.value;
  const confirmacao = control.get('confirmarSenha')?.value;

  return senha && confirmacao && senha !== confirmacao
    ? { senhasDiferentes: true }
    : null;
}

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroPacienteComponent {
  private readonly fb = inject(FormBuilder);
  private readonly cadastroService = inject(CadastroService);

  readonly cadastroForm = this.fb.group(
    {
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(150)],
      ],
      cpf: ['', [Validators.required, cpfValidator]],
      telefone: ['', [Validators.required, Validators.maxLength(20)]],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(72),
        ],
      ],
      confirmarSenha: ['', [Validators.required]],
    },
    { validators: senhasIguaisValidator },
  );

  mensagem = '';
  enviando = false;

  campoInvalido(nome: string): boolean {
    const campo = this.cadastroForm.get(nome);
    return !!campo && campo.invalid && (campo.touched || campo.dirty);
  }

  marcarCamposComoTocados(): void {
    this.cadastroForm.markAllAsTouched();
  }

  limparCpf(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 11);
    this.cadastroForm.controls.cpf.setValue(input.value);
  }

  enviar(): void {
    this.mensagem = '';
    this.marcarCamposComoTocados();

    if (this.cadastroForm.invalid) {
      this.mensagem = this.cadastroForm.hasError('senhasDiferentes')
        ? 'As senhas não coincidem.'
        : 'Confira os campos destacados e tente novamente.';
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
}