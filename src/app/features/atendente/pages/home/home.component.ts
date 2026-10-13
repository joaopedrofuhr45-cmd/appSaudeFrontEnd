import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '@shared/page-header/page-header.component';
import { StatCardComponent } from '@shared/stat-card/stat-card.component';
import { ConsultaRowComponent } from '@shared/consulta-row/consulta-row.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';
import { Consulta } from '@features/consulta/models/consulta.model';
import { StatusConsulta } from '@shared/status-badge/status-badge.component';
import { AtendenteService } from '@features/atendente/services/atendente.service';

@Component({
  selector: 'app-atendente-home',
  standalone: true,
  imports: [SidebarComponent, PageHeaderComponent, StatCardComponent, ConsultaRowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class AtendenteHomeComponent implements OnInit {
  private readonly consultaService = inject(ConsultaService);
  private readonly perfilService = inject(AtendenteService);
  nome = 'Atendente';
  subtitulo = 'Recepção';

  consultas: Consulta[] = [];
  carregando = true;

  ngOnInit(): void {
    this.perfilService.obterMeuPerfil().subscribe({ next: p => { this.nome = p.nome; this.subtitulo = `Atendente · ${p.setor}`; } });
     const hoje = new Date().toLocaleDateString('en-CA');; // "2026-06-08"

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

  statusParaBadge(status: Consulta['status']): StatusConsulta {
    return status.toLowerCase().replace('_', '-') as StatusConsulta;
  }
}
