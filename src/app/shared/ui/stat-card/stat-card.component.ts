import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent implements OnChanges, OnDestroy {
  @Input() icone = '';
  @Input() valor = '';
  @Input() label = '';

  exibido = '';
  private quadro = 0;

  ngOnChanges(): void {
    cancelAnimationFrame(this.quadro);

    const texto = this.valor.trim();
    const alvo = Number(texto);
    const contavel = /^\d+$/.test(texto) && alvo > 0 && alvo <= 100000;
    const reduzir = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!contavel || reduzir) {
      this.exibido = this.valor;
      return;
    }

    const duracao = 800;
    const inicio = performance.now();
    this.exibido = '0';

    const passo = (agora: number) => {
      const t = Math.min((agora - inicio) / duracao, 1);
      const suave = 1 - Math.pow(1 - t, 3);
      this.exibido = String(Math.round(alvo * suave));
      if (t < 1) this.quadro = requestAnimationFrame(passo);
    };
    this.quadro = requestAnimationFrame(passo);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.quadro);
  }
}
