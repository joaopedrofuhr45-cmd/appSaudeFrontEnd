import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { PacienteConsultaService } from '../../../service/consulta/paciente-consulta.service';
import { RegistroHistoricoPaciente } from '../../../model/consulta/paciente-consulta';

@Component({
  selector: 'app-historico-paciente',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './historico-paciente.component.html',
  styleUrl: './historico-paciente.component.css',
})
export class HistoricoPacienteComponent implements OnInit {
  private readonly consultaService = inject(PacienteConsultaService);
  registros: RegistroHistoricoPaciente[] = [];
  carregando = true;
  erro = '';

  ngOnInit(): void {
    this.consultaService.listarHistorico().subscribe({
      next: (registros) => { this.registros = registros; this.carregando = false; },
      error: () => { this.erro = 'Não foi possível carregar seu histórico.'; this.carregando = false; },
    });
  }
}
