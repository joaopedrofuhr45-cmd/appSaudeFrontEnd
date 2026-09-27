import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { PacienteConsultaService } from '../../../service/consulta/paciente-consulta.service';
import { OpcaoMedico } from '../../../model/consulta/paciente-consulta';

@Component({
  selector: 'app-agendar-consulta',
  standalone: true,
  imports: [ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './agendar-consulta.component.html',
  styleUrl: './agendar-consulta.component.css',
})
export class AgendarConsultaComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly consultaService = inject(PacienteConsultaService);
  especialidades: string[] = [];
  medicos: OpcaoMedico[] = [];
  enviando = false;
  carregandoOpcoes = true;
  readonly formulario = this.fb.group({
    especialidade: ['', Validators.required],
    medico: ['', Validators.required],
    data: ['', Validators.required],
    horario: ['', Validators.required],
    observacao: [''],
  });
  mensagem = '';

  ngOnInit(): void {
    this.consultaService
      .listarEspecialidades()
      .pipe(finalize(() => (this.carregandoOpcoes = false)))
      .subscribe({
        next: (especialidades) => {
          this.especialidades = especialidades;
          if (especialidades.length) {
            this.formulario.controls.especialidade.setValue(especialidades[0]);
            this.carregarMedicos();
          }
        },
        error: () => {
          this.mensagem = 'Não foi possível carregar as especialidades.';
        },
      });
  }

  carregarMedicos(): void {
    const especialidade = this.formulario.controls.especialidade.value;
    this.formulario.controls.medico.setValue('');
    if (!especialidade) {
      this.medicos = [];
      return;
    }
    this.consultaService.listarMedicos(especialidade).subscribe({
      next: (medicos) => {
        this.medicos = medicos;
      },
      error: () => {
        this.mensagem = 'Não foi possível carregar os médicos disponíveis.';
      },
    });
  }

  solicitar(): void {
    this.mensagem = '';
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) {
      this.mensagem =
        'Preencha a especialidade, a data e o horário para continuar.';
      return;
    }
    const dados = this.formulario.getRawValue();
    this.enviando = true;
    this.consultaService
      .solicitarAgendamento({
        especialidade: dados.especialidade!,
        medico: dados.medico!,
        data: dados.data!,
        horario: dados.horario!,
        observacao: dados.observacao || '',
      })
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          this.mensagem = 'Solicitação de consulta enviada.';
          this.formulario.reset();
        },
        error: () => {
          this.mensagem =
            'Não foi possível solicitar a consulta. Tente novamente.';
        },
      });
  }
}
