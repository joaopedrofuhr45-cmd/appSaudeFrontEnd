import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

interface Dia {
  iso: string;
  semana: string;
  numero: string;
  hoje: boolean;
  bloqueado: boolean;
}

@Component({
  selector: 'app-seletor-dia',
  standalone: true,
  template: `
    <div class="topo">
      <button type="button" class="nav" aria-label="Semana anterior" (click)="mudarSemana(-1)">‹</button>
      <strong class="mes">{{ rotuloMes }}</strong>
      <button type="button" class="nav" aria-label="Próxima semana" (click)="mudarSemana(1)">›</button>
      <button type="button" class="hoje-btn" (click)="irParaHoje()">Hoje</button>
    </div>
    <div class="dias">
      @for (d of dias; track d.iso) {
        <button type="button" class="dia" [class.ativo]="d.iso === valor" [class.eh-hoje]="d.hoje"
                [disabled]="d.bloqueado" (click)="escolher.emit(d.iso)">
          <span class="semana">{{ d.semana }}</span>
          <span class="numero">{{ d.numero }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
    .topo { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
    .mes { flex: 1; text-align: center; font-size: 13px; font-weight: 600; text-transform: capitalize; color: var(--cor-texto); }
    .nav { width: 34px; height: 34px; border: 1px solid var(--cor-borda); border-radius: 10px; background: #fff;
           font-size: 18px; line-height: 1; color: var(--cor-texto-secundario); cursor: pointer;
           transition: all .15s var(--ease); }
    .nav:hover { border-color: var(--cor-primaria); color: var(--cor-primaria); background: var(--cor-superficie); }
    .hoje-btn { height: 34px; padding: 0 14px; border: 1px solid var(--cor-primaria); border-radius: 10px; background: transparent;
                font: inherit; font-size: 12px; font-weight: 600; color: var(--cor-primaria); cursor: pointer;
                transition: all .15s var(--ease); }
    .hoje-btn:hover { background: var(--cor-primaria); color: #fff; }
    .dias { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 8px; }
    .dia { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; height: 62px;
           border: 1px solid var(--cor-borda); border-radius: 12px; background: #fff; font: inherit; cursor: pointer;
           transition: all .15s var(--ease); }
    .dia:hover:not(:disabled) { border-color: var(--cor-primaria); background: var(--cor-superficie); }
    .semana { font-size: 11px; font-weight: 500; text-transform: capitalize; color: var(--cor-texto-secundario); }
    .numero { font-size: 17px; font-weight: 600; color: var(--cor-texto); }
    .dia.eh-hoje .numero { color: var(--cor-primaria); }
    .dia.ativo { background: var(--cor-primaria); border-color: var(--cor-primaria); }
    .dia.ativo .semana, .dia.ativo .numero { color: #fff; }
    .dia:disabled { opacity: .35; cursor: not-allowed; }
  `],
})
export class SeletorDiaComponent implements OnChanges {
  @Input() valor = '';
  @Input() minimo = '';
  @Output() escolher = new EventEmitter<string>();

  inicioSemana = this.segunda(new Date());
  dias: Dia[] = [];
  rotuloMes = '';

  constructor() {
    this.montar();
  }

  ngOnChanges(): void {
    const base = this.parse(this.valor);
    if (base && !this.naSemanaAtual(base)) {
      this.inicioSemana = this.segunda(base);
    }
    this.montar();
  }

  mudarSemana(direcao: number): void {
    this.inicioSemana = this.somar(this.inicioSemana, direcao * 7);
    this.montar();
  }

  irParaHoje(): void {
    const hoje = new Date();
    this.inicioSemana = this.segunda(hoje);
    this.montar();
    const iso = this.iso(hoje);
    if (!this.minimo || iso >= this.minimo) this.escolher.emit(iso);
  }

  private montar(): void {
    const hojeIso = this.iso(new Date());
    this.dias = Array.from({ length: 7 }, (_, i) => {
      const d = this.somar(this.inicioSemana, i);
      const iso = this.iso(d);
      return {
        iso,
        semana: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
        numero: String(d.getDate()),
        hoje: iso === hojeIso,
        bloqueado: !!this.minimo && iso < this.minimo,
      };
    });
    this.rotuloMes = this.somar(this.inicioSemana, 3)
      .toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  private naSemanaAtual(d: Date): boolean {
    const iso = this.iso(d);
    return iso >= this.iso(this.inicioSemana) && iso <= this.iso(this.somar(this.inicioSemana, 6));
  }

  private segunda(d: Date): Date {
    const desvio = (d.getDay() + 6) % 7;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - desvio);
  }

  private somar(d: Date, dias: number): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + dias);
  }

  private iso(d: Date): string {
    return d.toLocaleDateString('en-CA');
  }

  private parse(iso: string): Date | null {
    if (!iso) return null;
    const [a, m, d] = iso.split('-').map(Number);
    return new Date(a, m - 1, d);
  }
}