import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FotoBlobService } from '@shared/services/foto-blob.service';
import { FotoPerfilService, RecursoPerfil } from '@shared/services/foto-perfil.service';

const TIPOS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 2 * 1024 * 1024;

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.css',
})
export class AvatarUploadComponent implements OnChanges {
  private readonly fotos = inject(FotoPerfilService);
  private readonly blobs = inject(FotoBlobService);

  @Input({ required: true }) recurso!: RecursoPerfil;
  @Input() nome = '';
  @Input() fotoUrl?: string | null;
  @Output() fotoAlterada = new EventEmitter<string | null>();

  imagem: string | null = null;
  enviando = false;
  erro = '';

  ngOnChanges(): void {
    if (this.fotoUrl && !this.enviando) {
      this.blobs.carregar(this.fotoUrl).subscribe({ next: (src) => (this.imagem = src), error: () => (this.imagem = null) });
    }
  }

  get iniciais(): string {
    const p = this.nome.trim().split(/\s+/).filter(Boolean);
    return p.length ? (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase() : '?';
  }

  escolher(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const arquivo = input.files?.[0];
    input.value = '';
    if (!arquivo) return;
    this.erro = '';
    if (!TIPOS.includes(arquivo.type)) { this.erro = 'Use uma imagem JPG, PNG ou WebP.'; return; }
    if (arquivo.size > MAX_BYTES) { this.erro = 'A imagem deve ter no máximo 2 MB.'; return; }

    const anterior = this.imagem;
    const previa = URL.createObjectURL(arquivo);
    this.imagem = previa;
    this.enviando = true;
    this.fotos.enviar(this.recurso, arquivo).subscribe({
      next: () => { this.enviando = false; this.imagem = previa; this.fotos.alterada$.next(previa); this.fotoAlterada.emit(previa); },
      error: () => { this.enviando = false; this.imagem = anterior; this.erro = 'Não foi possível enviar a foto.'; },
    });
  }

  remover(): void {
    this.erro = '';
    this.enviando = true;
    this.fotos.remover(this.recurso).subscribe({
      next: () => { this.enviando = false; this.imagem = null; this.fotos.alterada$.next(null); this.fotoAlterada.emit(null); },
      error: () => { this.enviando = false; this.erro = 'Não foi possível remover a foto.'; },
    });
  }
}
