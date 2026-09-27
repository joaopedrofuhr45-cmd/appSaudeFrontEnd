import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PacienteConsultaService } from '../../../service/consulta/paciente-consulta.service';
import { PacienteConsulta } from '../../../model/consulta/paciente-consulta';
import { StatusConsulta } from '../../../shared/status-badge/status-badge.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { ConsultaRowComponent } from '../../../shared/consulta-row/consulta-row.component';

@Component({
  selector: 'app-paciente-home',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, StatCardComponent, ConsultaRowComponent, RouterLink],
  templateUrl: './paciente-home.component.html',
  styleUrl: './paciente-home.component.css',
})
export class PacienteHomeComponent implements OnInit {
  private readonly consultaService = inject(PacienteConsultaService);
  consultas: PacienteConsulta[] = [];
  especialidades: string[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.consultaService.listarMinhasConsultas().subscribe({
      next: (consultas) => { this.consultas = consultas; this.carregando = false; },
      error: () => { this.erro = 'Não foi possível carregar suas consultas.'; this.carregando = false; },
    });
    this.consultaService.listarEspecialidades().subscribe({
      next: (especialidades) => { this.especialidades = especialidades; },
    });
  }

  get proximas(): PacienteConsulta[] {
    const agora = new Date();
    return this.consultas
      .filter(c => c.status === 'AGENDADO' || c.status === 'CONFIRMADO' || c.status === 'EM_ESPERA')
      .filter(c => new Date(c.dataHora) >= agora)
      .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime())
      .slice(0, 2);
  }

  get totalRealizadas(): number {
    return this.consultas.filter(c => c.status === 'CONCLUIDO').length;
  }

  statusParaBadge(status: PacienteConsulta['status']): StatusConsulta {
    return status.toLowerCase().replace('_', '-') as StatusConsulta;
  }

  detalhe(consulta: PacienteConsulta): string {
    return [consulta.especialidade, new Date(consulta.dataHora).toLocaleDateString('pt-BR'), consulta.unidade || consulta.modalidade]
      .filter(Boolean).join(' · ');
  }

  hora(consulta: PacienteConsulta): string {
    return new Date(consulta.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  statusTexto(status: PacienteConsulta['status']): string {
    const textos: Record<PacienteConsulta['status'], string> = {
      AGENDADO: 'Agendada', CONFIRMADO: 'Confirmada', EM_ESPERA: 'Pendente',
      CANCELADO: 'Cancelada', CONCLUIDO: 'Concluída',
    };
    return textos[status];
  }
}
