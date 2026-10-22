import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '@shared/page-header/page-header.component';
import { RevealDirective } from '@shared/reveal/reveal.component';
import { ConsultaService } from '@features/consulta/services/consulta.service';
import { HistoricoConsulta } from '@features/consulta/models/consulta.model';

@Component({
  selector: 'app-historico-paciente',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, RevealDirective],
  templateUrl: './historico-paciente.component.html',
  styleUrl: './historico-paciente.component.css',
})
export class HistoricoPacienteComponent implements OnInit {
  private readonly consultaService = inject(ConsultaService);

  registros: HistoricoConsulta[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.carregando = true;
    this.erro = '';

    this.consultaService.listarHistorico().subscribe({
      next: (dados) => {
        this.registros = [...dados].sort(
          (a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime(),
        );
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível carregar seu histórico.';
        this.carregando = false;
      },
    });
  }
}
