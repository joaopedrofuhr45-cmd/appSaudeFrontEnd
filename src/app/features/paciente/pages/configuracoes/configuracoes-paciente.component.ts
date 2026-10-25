import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeaderComponent } from '@shared/ui/page-header/page-header.component';
import { AvatarUploadComponent } from '@shared/ui/avatar-upload/avatar-upload.component';
import { AlterarSenhaComponent } from '@shared/ui/alterar-senha/alterar-senha.component';
import { finalize } from 'rxjs';
import { PacienteService } from '@features/paciente/services/paciente.service';

@Component({
  selector: 'app-configuracoes-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent, AvatarUploadComponent, AlterarSenhaComponent],
  templateUrl: './configuracoes-paciente.component.html',
  styleUrl: './configuracoes-paciente.component.css',
})
export class ConfiguracoesPacienteComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly pacienteService = inject(PacienteService);
  @ViewChild(AlterarSenhaComponent) senhaForm?: AlterarSenhaComponent;

  readonly dados = this.fb.group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', Validators.required],
  });
  fotoUrl: string | null | undefined = null;
  mensagemDados = '';
  mensagemSenha = '';
  erroSenha = '';
  carregando = true;
  salvandoDados = false;
  salvandoSenha = false;

  get nome(): string { return this.dados.value.nome ?? ''; }

  ngOnInit(): void {
    this.pacienteService.obterMeuPerfil().pipe(finalize(() => this.carregando = false)).subscribe({
      next: (perfil) => { this.dados.patchValue(perfil); this.fotoUrl = perfil.fotoUrl; },
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

  salvarSenha(novaSenha: string): void {
    this.mensagemSenha = '';
    this.erroSenha = '';
    this.salvandoSenha = true;
    this.pacienteService.alterarSenha({ novaSenha })
      .pipe(finalize(() => this.salvandoSenha = false))
      .subscribe({
        next: () => { this.senhaForm?.limpar(); this.mensagemSenha = 'Senha atualizada.'; },
        error: () => { this.erroSenha = 'Não foi possível atualizar a senha.'; },
      });
  }
}
