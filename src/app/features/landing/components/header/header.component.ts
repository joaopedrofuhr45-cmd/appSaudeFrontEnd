import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ItemMenu {
  id: string;
  rotulo: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  /** Ids das seções da landing que o menu aponta. */
  readonly itens: ItemMenu[] = [
    { id: 'inicio', rotulo: 'Início' },
    { id: 'sobre', rotulo: 'Sobre nós' },
    { id: 'como-funciona', rotulo: 'Como funciona' },
    { id: 'contato', rotulo: 'Contato' }
  ];

  rolado = false;
  ativa = 'inicio';

  @HostListener('window:scroll')
  @HostListener('window:resize')
  aoRolar(): void {
    this.rolado = window.scrollY > 24;
    this.ativa = this.secaoVisivel();
  }

  /** Seção cujo topo foi o último a passar da linha logo abaixo do header. */
  private secaoVisivel(): string {
    const linha = window.scrollY + 140;
    let atual = this.itens[0].id;
    let maiorTopo = -Infinity;

    for (const { id } of this.itens) {
      const secao = document.getElementById(id);
      if (!secao) continue;
      const topo = secao.getBoundingClientRect().top + window.scrollY;
      if (topo <= linha && topo > maiorTopo) {
        maiorTopo = topo;
        atual = id;
      }
    }

    const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    return noFim ? this.itens[this.itens.length - 1].id : atual;
  }
}
