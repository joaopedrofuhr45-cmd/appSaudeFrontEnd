import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { PacienteService } from '@features/paciente/services/paciente.service';

@Component({
  selector: 'app-paciente-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  template: `
    <div class="paciente-layout">
      <app-sidebar
        [nome]="nomePaciente"
        [subtitulo]="subtitulo"
        [itens]="itens"
        rotaLogout="/menu-inicial"
      />
      <main class="paciente-conteudo"><router-outlet /></main>
    </div>
  `,
  styleUrl: './paciente-layout.component.css',
})
export class PacienteLayoutComponent implements OnInit {
  private readonly pacienteService = inject(PacienteService);
  nomePaciente = 'Paciente';
  subtitulo = '';

  ngOnInit(): void {
    this.pacienteService.obterMeuPerfil().subscribe({
      next: (perfil) => { this.nomePaciente = perfil.nome; },
    });
  }

  readonly itens = [
    { label: 'Início', rota: '/paciente/dashboard' },
    { label: 'Agendar consulta', rota: '/paciente/agendar-consulta' },
    { label: 'Consultas anteriores', rota: '/paciente/consultas-anteriores' },
    { label: 'Histórico', rota: '/paciente/historico' },
    { label: 'Configurações', rota: '/paciente/configuracoes' },
  ];
}
