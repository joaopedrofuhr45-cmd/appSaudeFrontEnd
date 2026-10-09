import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '@shared/page-header/page-header.component';
import { ConsultaRowComponent } from '@shared/consulta-row/consulta-row.component';
import { StatusBadgeComponent, StatusConsulta } from '@shared/status-badge/status-badge.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';
import { Consulta } from '@features/consulta/models/consulta.model';
import { MedicoService } from '@features/medico/services/medico.service';

@Component({
  selector: 'app-medico-home',
  standalone: true,
  imports: [FormsModule, RouterLink, SidebarComponent, PageHeaderComponent, ConsultaRowComponent, StatusBadgeComponent],
  templateUrl: './medico-home.component.html',
  styleUrl: './medico-home.component.css',
})
export class MedicoHomeComponent implements OnInit {
  private readonly consultaService = inject(ConsultaService);
  private readonly perfilService = inject(MedicoService);
  nome = 'Médico';
  subtitulo = 'Área médica';

  consultas: Consulta[] = [];
  carregando = true;
  busca = '';
  situacao = '';

  ngOnInit(): void {
    this.perfilService.obterMeuPerfil().subscribe({ next: p => { this.nome = p.nome; this.subtitulo = p.especialidade; } });
    const hoje = new Date().toLocaleDateString('en-CA');

    this.consultaService.listarPorData(hoje).subscribe({
      next: (dados) => {
        this.consultas = dados;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      },
    });
  }

  get filtradas(): Consulta[] {
    const termo = this.busca.trim().toLocaleLowerCase('pt-BR');

    return this.consultas.filter((consulta) => {
      const pacienteOk = !termo ||
        consulta.nomePaciente.toLocaleLowerCase('pt-BR').includes(termo);
      const statusOk = !this.situacao || consulta.status === this.situacao;
      return pacienteOk && statusOk;
    });
  }

  statusParaBadge(status: Consulta['status']): StatusConsulta {
    return status.toLowerCase().replace('_', '-') as StatusConsulta;
  }

  statusTexto(status: Consulta['status']): string {
    return ({
      AGENDADO: 'Agendado',
      CONFIRMADO: 'Confirmado',
      EM_ESPERA: 'Em espera',
      CANCELADO: 'Cancelado',
      CONCLUIDO: 'Finalizado',
    })[status];
  }
}
