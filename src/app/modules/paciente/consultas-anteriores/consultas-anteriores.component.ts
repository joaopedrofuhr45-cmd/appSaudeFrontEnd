import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { StatusBadgeComponent, StatusConsulta } from '../../../shared/status-badge/status-badge.component';
import { PacienteConsultaService } from '../../../service/consulta/paciente-consulta.service';
import { PacienteConsulta } from '../../../model/consulta/paciente-consulta';

@Component({
  selector: 'app-consultas-anteriores',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, StatusBadgeComponent],
  templateUrl: './consultas-anteriores.component.html',
  styleUrl: './consultas-anteriores.component.css',
})
export class ConsultasAnterioresComponent implements OnInit {
  private readonly consultaService = inject(PacienteConsultaService);
  busca = '';
  periodo = 'Últimos 12 meses';
  situacao = 'Todas';
  consultas: PacienteConsulta[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.consultaService.listarMinhasConsultas().subscribe({
      next: (consultas) => { this.consultas = consultas; this.carregando = false; },
      error: () => { this.erro = 'Não foi possível carregar suas consultas.'; this.carregando = false; },
    });
  }

  get filtradas(): PacienteConsulta[] {
    const termo = this.busca.trim().toLocaleLowerCase('pt-BR');
    return this.consultas.filter(c => {
      const buscaOk = !termo || `${c.medico} ${c.especialidade}`.toLocaleLowerCase('pt-BR').includes(termo);
      const situacaoOk = this.situacao === 'Todas' || this.statusTexto(c.status) === this.situacao;
      const limiteDias = this.periodo === 'Últimos 30 dias' ? 30 : this.periodo === 'Últimos 6 meses' ? 180 : 365;
      const periodoOk = Date.now() - new Date(c.dataHora).getTime() <= limiteDias * 86400000;
      const anterior = new Date(c.dataHora).getTime() < Date.now();
      return buscaOk && situacaoOk && periodoOk && anterior && (c.status === 'CONCLUIDO' || c.status === 'CANCELADO');
    });
  }

  statusParaBadge(status: PacienteConsulta['status']): StatusConsulta { return status.toLowerCase().replace('_', '-') as StatusConsulta; }
  statusTexto(status: PacienteConsulta['status']): string {
    return ({ AGENDADO: 'Agendada', CONFIRMADO: 'Confirmada', EM_ESPERA: 'Pendente', CANCELADO: 'Cancelada', CONCLUIDO: 'Concluída' })[status];
  }
  horario(dataHora: string): string { return new Date(dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); }
  classe(status: PacienteConsulta['status']): string { return status === 'CANCELADO' ? 'vermelho' : 'verde'; }
}
