import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '@shared/page-header/page-header.component';
import { StatusBadgeComponent, StatusConsulta as StatusBadge } from '@shared/status-badge/status-badge.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';
import { ConsultaDetalhe } from '@features/consulta/models/consulta.model';

@Component({
  selector: 'app-detalhes-consulta-paciente',
  standalone: true,
  imports: [DatePipe, RouterLink, PageHeaderComponent, StatusBadgeComponent],
  templateUrl: './detalhes-consulta.component.html',
  styleUrl: './detalhes-consulta.component.css',
})
export class DetalhesConsultaPacienteComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(ConsultaService);

  consulta: ConsultaDetalhe | null = null;
  carregando = true;
  erro = '';
  confirmandoCancelamento = false;
  cancelando = false;
  erroCancelamento = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.erro = 'Consulta inválida.';
      this.carregando = false;
      return;
    }
    this.service
      .obter(id)
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: (c) => (this.consulta = c),
        error: (e) => (this.erro = e?.error?.message ?? 'Não foi possível carregar a consulta.'),
      });
  }

  get concluida(): boolean {
    return this.consulta?.status === 'CONCLUIDO';
  }

  get podeCancelar(): boolean {
    return !!this.consulta && !['CONCLUIDO', 'CANCELADO'].includes(this.consulta.status);
  }

  pedirCancelamento(): void {
    this.erroCancelamento = '';
    this.confirmandoCancelamento = true;
  }

  desistirDoCancelamento(): void {
    this.confirmandoCancelamento = false;
  }

  confirmarCancelamento(): void {
    if (!this.consulta) return;
    this.cancelando = true;
    this.erroCancelamento = '';
    this.service
      .cancelar(this.consulta.id)
      .pipe(finalize(() => (this.cancelando = false)))
      .subscribe({
        next: (c) => {
          this.consulta = c;
          this.confirmandoCancelamento = false;
        },
        error: (e) =>
          (this.erroCancelamento = e?.error?.message ?? 'Não foi possível cancelar a consulta.'),
      });
  }

  statusParaBadge(status: ConsultaDetalhe['status']): StatusBadge {
    return status.toLowerCase().replace('_', '-') as StatusBadge;
  }

  statusTexto(status: ConsultaDetalhe['status']): string {
    return {
      AGENDADO: 'Agendada',
      CONFIRMADO: 'Confirmada',
      EM_ESPERA: 'Pendente',
      CANCELADO: 'Cancelada',
      CONCLUIDO: 'Concluída',
    }[status];
  }
}
