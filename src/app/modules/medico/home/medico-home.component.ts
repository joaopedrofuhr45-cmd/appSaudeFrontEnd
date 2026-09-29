import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { ConsultaRowComponent } from '../../../shared/consulta-row/consulta-row.component';
import { StatusBadgeComponent, StatusConsulta } from '../../../shared/status-badge/status-badge.component';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { Consulta } from '../../../model/consulta/consulta.model';

@Component({
  selector: 'app-medico-home',
  standalone: true,
  imports: [FormsModule, RouterLink, SidebarComponent, PageHeaderComponent, ConsultaRowComponent, StatusBadgeComponent],
  templateUrl: './medico-home.component.html',
  styleUrl: './medico-home.component.css',
})
export class MedicoHomeComponent implements OnInit {
  private readonly consultaService = inject(ConsultaService);

  consultas: Consulta[] = [];
  carregando = true;
  busca = '';
  situacao = '';

  ngOnInit(): void {
    const hoje = new Date().toISOString().split('T')[0];

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
