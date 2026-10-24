import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@shared/header/header.component';
import { RevealDirective } from '@shared/reveal/reveal.component';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [RouterLink, HeaderComponent, RevealDirective],
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent {
  readonly ano = new Date().getFullYear();

  /** Dados de contato exibidos na seção e no rodapé (troque pelos reais). */
  readonly contato = {
    email: 'contato@saudemais.com.br',
    telefone: '(00) 0000-0000',
    horario: 'Segunda a sexta, das 8h às 18h'
  };

  get telefoneLink(): string {
    return 'tel:' + this.contato.telefone.replace(/\D/g, '');
  }
}