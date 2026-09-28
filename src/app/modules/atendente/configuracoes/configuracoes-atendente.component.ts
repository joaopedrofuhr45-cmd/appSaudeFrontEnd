import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';

@Component({
  selector: 'app-configuracoes-atendente',
  standalone: true,
  imports: [FormsModule, SidebarComponent, PageHeaderComponent],
  templateUrl: './configuracoes-atendente.component.html',
  styleUrl: './configuracoes-atendente.component.css',
})
export class ConfiguracoesAtendenteComponent {
  nome = 'Camila Reis';
  email = 'camila.reis@saude.com';
  telefone = '(11) 98765-4321';
  senhaAtual = '';
  novaSenha = '';
  confirmarSenha = '';
  mensagem = '';

  salvarDados(): void {
    this.mensagem = 'Dados prontos para integração com o perfil do atendente.';
  }

  salvarSenha(): void {
    this.mensagem = this.novaSenha && this.novaSenha === this.confirmarSenha
      ? 'Senha validada. A gravação será ligada ao endpoint de perfil.'
      : 'Confira a nova senha e a confirmação.';
  }
}
