import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seletor-horario',
  standalone: true,
  template: `
    @if (!data) {
      <p class="aviso">Escolha a data para ver os horários.</p>
    } @else {
      @for (periodo of periodos; track periodo.nome) {
        <p class="periodo">{{ periodo.nome }}</p>
        <div class="slots">
          @for (h of periodo.horarios; track h) {
            <button type="button" class="slot" [class.ativo]="h === valor"
                    [disabled]="passado(h)" (click)="escolher.emit(h)">{{ h }}</button>
          }
        </div>
      }
    }
  `,
  styles: [`
    .aviso { margin: 0; font-size: 12px; color: var(--cor-texto-secundario); }
    .periodo { margin: 10px 0 6px; font-size: 12px; font-weight: 600; color: var(--cor-texto-secundario); }
    .slots { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 8px; }
    .slot { height: 38px; border: 1px solid var(--cor-borda); border-radius: 10px; background: #fff;
            font: inherit; font-size: 13px; cursor: pointer; transition: all .15s var(--ease); }
    .slot:hover:not(:disabled) { border-color: var(--cor-primaria); background: var(--cor-superficie); }
    .slot.ativo { background: var(--cor-primaria); border-color: var(--cor-primaria); color: #fff; }
    .slot:disabled { opacity: .35; cursor: not-allowed; }
  `],
})
export class SeletorHorarioComponent {
  @Input() data = '';
  @Input() valor = '';
  @Output() escolher = new EventEmitter<string>();

  readonly periodos = [
    { nome: 'Manhã', horarios: this.gerar(8, 12) },
    { nome: 'Tarde', horarios: this.gerar(13, 18) },
  ];

  private gerar(inicio: number, fim: number): string[] {
    const lista: string[] = [];
    for (let h = inicio; h < fim; h++) {
      const hh = String(h).padStart(2, '0');
      lista.push(`${hh}:00`, `${hh}:30`);
    }
    return lista;
  }

  passado(hora: string): boolean {
    if (this.data !== new Date().toLocaleDateString('en-CA')) return false;
    const agora = new Date();
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m <= agora.getHours() * 60 + agora.getMinutes();
  }
}