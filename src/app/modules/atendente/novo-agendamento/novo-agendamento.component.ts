import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { MedicoOpcao, PacienteOpcao } from '../../../model/consulta/consulta.model';

@Component({
  selector: 'app-novo-agendamento',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, PageHeaderComponent],
  templateUrl: './novo-agendamento.component.html',
  styleUrl: './novo-agendamento.component.css',
})
export class NovoAgendamentoComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly consultaService = inject(ConsultaService);
  private readonly router = inject(Router);

  especialidades: string[] = [];
  medicos: MedicoOpcao[] = [];
  pacientes: PacienteOpcao[] = [];
  buscaPaciente = '';
  carregando = false;
  carregandoOpcoes = true;
  mensagem = '';

  readonly formulario = this.fb.group({
    pacienteId: [null as number | null, Validators.required],
    tipoConsulta: ['', Validators.required],
    medicoId: [null as number | null, Validators.required],
    unidade: [''],
    data: ['', Validators.required],
    horario: ['', Validators.required],
    situacao: ['AGENDADO'],
    observacao: [''],
  });

  ngOnInit(): void {
    this.consultaService
      .listarEspecialidades()
      .pipe(finalize(() => (this.carregandoOpcoes = false)))
      .subscribe({
        next: (dados) => {
          this.especialidades = dados;
        },
        error: () => {
          this.mensagem = 'Não foi possível carregar os tipos de consulta.';
        },
      });
  }

  buscarPaciente(): void {
    const termo = this.buscaPaciente.trim();
    if (termo.length < 2) { this.pacientes = []; return; }
    this.consultaService.buscarPacientes(termo).subscribe({
      next: dados => this.pacientes = dados,
      error: () => this.mensagem = 'Não foi possível buscar pacientes.'
    });
  }

  selecionarPaciente(paciente: PacienteOpcao): void {
    this.formulario.controls.pacienteId.setValue(paciente.id);
    this.buscaPaciente = paciente.nome;
    this.pacientes = [];
  }

  carregarMedicos(): void {
    const especialidade = this.formulario.controls.tipoConsulta.value;
    this.formulario.controls.medicoId.setValue(null);

    if (!especialidade) {
      this.medicos = [];
      return;
    }

    this.consultaService.listarMedicos(especialidade).subscribe({
      next: (dados) => (this.medicos = dados),
      error: () => (this.mensagem = 'Não foi possível carregar os profissionais.'),
    });
  }

  confirmar(): void {
    this.mensagem = '';
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      this.mensagem = 'Preencha os campos obrigatórios para continuar.';
      return;
    }

    const dados = this.formulario.getRawValue();
    this.carregando = true;

    this.consultaService
      .agendar({
        pacienteId: dados.pacienteId!,
        medicoId: dados.medicoId!,
        tipoConsulta: dados.tipoConsulta!,
        dataHora: `${dados.data}T${dados.horario}:00`,
        observacao: dados.observacao || '',
      })
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: () => this.router.navigate(['/atendente/home']),
        error: () => (this.mensagem = 'Não foi possível confirmar o agendamento.'),
      });
  }

  cancelar(): void {
    this.router.navigate(['/atendente/home']);
  }
}
