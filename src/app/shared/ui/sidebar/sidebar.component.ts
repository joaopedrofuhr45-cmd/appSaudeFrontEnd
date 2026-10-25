import { Component, HostListener, Input, OnChanges, inject } from '@angular/core';
import { FotoBlobService } from '@shared/services/foto-blob.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  rota: string;
  /** opcional: inicio | agenda | agendar | historico | prancheta | ajustes */
  icone?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  private readonly blobs = inject(FotoBlobService);
  fotoSrc: string | null = null;

  ngOnChanges(): void {
    if (!this.fotoUrl) { this.fotoSrc = null; return; }
    this.blobs.carregar(this.fotoUrl).subscribe({ next: (s) => (this.fotoSrc = s), error: () => (this.fotoSrc = null) });
  }

  @Input() nome = '';
  @Input() subtitulo = '';
  @Input() itens: SidebarItem[] = [];
  @Input() rotaLogout = '/';
  @Input() fotoUrl?: string | null;

  /** Só vale no celular: a sidebar vira uma gaveta aberta pelo botão do menu. */
  aberto = false;

  alternar(): void { this.aberto = !this.aberto; }

  @HostListener('document:keydown.escape')
  fechar(): void { this.aberto = false; }

  /** Duas letras para o avatar: primeira e última palavra do nome. */
  get iniciais(): string {
    const partes = (this.nome ?? '').trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return '';
    const primeira = partes[0][0];
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (primeira + ultima).toUpperCase();
  }

  /** Escolhe o ícone pelo item; sem `icone` explícito, deduz pela rota. */
  icone(item: SidebarItem): string {
    if (item.icone) return item.icone;
    const rota = item.rota;
    if (rota.includes('configuracoes')) return 'ajustes';
    if (rota.includes('agendar') || rota.includes('novo-agendamento')) return 'agendar';
    if (rota.includes('anteriores')) return 'historico';
    if (rota.startsWith('/atendente')) return 'prancheta';
    if (rota.startsWith('/medico')) return 'agenda';
    return 'inicio';
  }
}
