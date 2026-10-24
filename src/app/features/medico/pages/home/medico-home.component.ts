import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SidebarComponent } from '@shared/ui/sidebar/sidebar.component';
import { PageHeaderComponent } from '@shared/ui/page-header/page-header.component';
import { ConsultaRowComponent } from '@features/consulta/components/consulta-row/consulta-row.component';
import { StatusBadgeComponent, StatusConsulta } from '@features/consulta/components/status-badge/status-badge.component';
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
  private readonly medicoService = inject(MedicoService);
  nome = 'Médico';
  subtitulo = 'Área médica';

  consultas: Consulta[] = [];
  carregando = true;
  busca = '';
  situacao = '';

  ngOnInit(): void {
    this.medicoService.obterMeuPerfil().subscribe({ next: p => { this.nome = p.nome; this.subtitulo = p.especialidade; } });
    const hoje = new Date().toLocaleDateString('en-CA');

    this.medicoService.listarAgenda(hoje).subscribe({
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
