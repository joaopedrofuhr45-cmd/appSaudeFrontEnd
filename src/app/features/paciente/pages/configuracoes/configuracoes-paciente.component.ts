import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeaderComponent } from '@shared/page-header/page-header.component';
import { finalize } from 'rxjs';
import { PacienteService } from '@features/paciente/services/paciente.service';

@Component({
  selector: 'app-configuracoes-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './configuracoes-paciente.component.html',
  styleUrl: './configuracoes-paciente.component.css',
})
export class ConfiguracoesPacienteComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly pacienteService = inject(PacienteService);
  readonly dados = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', Validators.required],
  });
  readonly senha = this.fb.group({
    atual: ['', Validators.required],
    nova: ['', [Validators.required, Validators.minLength(8)]],
    confirmar: ['', Validators.required],
  });
  mensagemDados = '';
  mensagemSenha = '';
  carregando = true;
  salvandoDados = false;
  salvandoSenha = false;

  ngOnInit(): void {
    this.pacienteService.obterMeuPerfil().pipe(finalize(() => this.carregando = false)).subscribe({
      next: (perfil) => this.dados.patchValue(perfil),
      error: () => { this.mensagemDados = 'Não foi possível carregar seus dados.'; },
    });
  }

  salvarDados(): void {
    this.mensagemDados = '';
    this.dados.markAllAsTouched();
    if (this.dados.invalid) { this.mensagemDados = 'Confira os campos preenchidos.'; return; }
    this.salvandoDados = true;
    this.pacienteService.atualizarPerfil(this.dados.getRawValue() as { nome: string; email: string; telefone: string })
      .pipe(finalize(() => this.salvandoDados = false))
      .subscribe({
        next: (perfil) => { this.dados.patchValue(perfil); this.mensagemDados = 'Dados atualizados.'; },
        error: () => { this.mensagemDados = 'Não foi possível salvar seus dados.'; },
      });
  }

  salvarSenha(): void {
    this.mensagemSenha = '';
    this.senha.markAllAsTouched();
    if (!this.senha.valid) { this.mensagemSenha = 'Preencha os campos. A senha deve ter pelo menos 8 caracteres.'; return; }
    if (this.senha.value.nova !== this.senha.value.confirmar) { this.mensagemSenha = 'A confirmação não corresponde à nova senha.'; return; }
    this.salvandoSenha = true;
    this.pacienteService.alterarSenha({ senhaAtual: this.senha.value.atual!, novaSenha: this.senha.value.nova! })
      .pipe(finalize(() => this.salvandoSenha = false))
      .subscribe({
        next: () => { this.senha.reset(); this.mensagemSenha = 'Senha atualizada.'; },
        error: () => { this.mensagemSenha = 'Não foi possível atualizar a senha.'; },
      });
  }
}
