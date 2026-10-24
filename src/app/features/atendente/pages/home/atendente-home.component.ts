import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '@shared/ui/sidebar/sidebar.component';
import { PageHeaderComponent } from '@shared/ui/page-header/page-header.component';
import { StatCardComponent } from '@shared/ui/stat-card/stat-card.component';
import { ConsultaRowComponent } from '@features/consulta/components/consulta-row/consulta-row.component';
import { SeletorDiaComponent } from '@features/consulta/components/seletor-dia/seletor-dia.component';
import { RevealDirective } from '@shared/ui/reveal/reveal.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';
import { Consulta, StatusConsulta } from '@features/consulta/models/consulta.model';
import { StatusConsulta as StatusBadge } from '@features/consulta/components/status-badge/status-badge.component';
import { AtendenteService } from '@features/atendente/services/atendente.service';

const STATUS_ATIVOS: StatusConsulta[] = ['AGENDADO', 'CONFIRMADO', 'EM_ESPERA'];

@Component({
  selector: 'app-atendente-home',
  standalone: true,
  imports: [
    FormsModule,
    SidebarComponent,
    PageHeaderComponent,
    StatCardComponent,
    ConsultaRowComponent,
    SeletorDiaComponent,
    RevealDirective,
  ],
  templateUrl: './atendente-home.component.html',
  styleUrl: './atendente-home.component.css',
})
export class AtendenteHomeComponent implements OnInit {
  private readonly consultaService = inject(ConsultaService);
  private readonly perfilService = inject(AtendenteService);

  nome = 'Atendente';
  subtitulo = 'Recepção';

  consultas: Consulta[] = [];
  carregando = true;
  erro = '';

  dataSelecionada = new Date().toLocaleDateString('en-CA');
  busca = '';
  situacao: StatusConsulta | '' = '';

  ngOnInit(): void {
    this.perfilService.obterMeuPerfil().subscribe({
      next: (p) => {
        this.nome = p.nome;
        this.subtitulo = `Atendente · ${p.setor}`;
      },
    });
    this.carregarConsultas();
  }

  selecionarData(iso: string): void {
    this.dataSelecionada = iso;
    this.carregarConsultas();
  }

  carregarConsultas(): void {
    if (!this.dataSelecionada) return;
    this.carregando = true;
    this.erro = '';

    this.consultaService.listarPorData(this.dataSelecionada).subscribe({
      next: (dados) => {
        this.consultas = dados;
        this.carregando = false;
      },
      error: () => {
        this.consultas = [];
        this.erro = 'Não foi possível carregar os atendimentos desta data.';
        this.carregando = false;
      },
    });
  }

  get consultasFiltradas(): Consulta[] {
    const termo = this.busca.trim().toLocaleLowerCase('pt-BR');
    return this.consultas.filter((consulta) => {
      const nomeOk = !termo || consulta.nomePaciente.toLocaleLowerCase('pt-BR').includes(termo);
      const statusOk = !this.situacao || consulta.status === this.situacao;
      return nomeOk && statusOk;
    });
  }

  get totalAgendadas(): number {
    return this.consultas.filter((c) => STATUS_ATIVOS.includes(c.status)).length;
  }

  get proximoHorario(): string {
    const ativas = this.consultas
      .filter((c) => STATUS_ATIVOS.includes(c.status))
      .sort((a, b) => new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime());

    const hoje = this.dataSelecionada === new Date().toLocaleDateString('en-CA');
    const agora = new Date();
    const proxima = hoje ? ativas.find((c) => new Date(c.dataHora) >= agora) : ativas[0];

    return proxima ? proxima.horario : '—';
  }

  get dataFormatada(): string {
    if (!this.dataSelecionada) return '';
    const [ano, mes, dia] = this.dataSelecionada.split('-').map(Number);
    return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
  }

  statusParaBadge(status: Consulta['status']): StatusBadge {
    return status.toLowerCase().replace('_', '-') as StatusBadge;
  }

  statusTexto(status: Consulta['status']): string {
    return ({
      AGENDADO: 'Agendada',
      CONFIRMADO: 'Confirmada',
      EM_ESPERA: 'Em espera',
      CANCELADO: 'Cancelada',
      CONCLUIDO: 'Concluída',
    })[status];
  }
}