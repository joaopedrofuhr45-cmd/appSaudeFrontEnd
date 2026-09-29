import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { ConsultaDetalhe } from '../../../model/consulta/consulta.model';

@Component({
  selector: 'app-atendimento-medico',
  standalone: true,
  imports: [FormsModule, DatePipe, SidebarComponent, PageHeaderComponent],
  templateUrl: './atendimento-medico.component.html',
  styleUrl: './atendimento-medico.component.css'
})
export class AtendimentoMedicoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ConsultaService);

  readonly id = this.route.snapshot.paramMap.get('id');
  consulta: ConsultaDetalhe | null = null;
  observacao = '';
  carregando = true;
  finalizando = false;
  erro = '';

  ngOnInit(): void {
    if (!this.id) { this.erro = 'Consulta inválida.'; this.carregando = false; return; }
    this.service.obter(this.id).pipe(finalize(() => this.carregando = false)).subscribe({
      next: c => { this.consulta = c; this.observacao = c.observacao ?? ''; },
      error: e => this.erro = e?.error?.message ?? 'Não foi possível carregar o atendimento.'
    });
  }

  finalizar(): void {
    if (!this.id || this.finalizando) return;
    this.finalizando = true;
    this.erro = '';
    this.service.finalizar(this.id, this.observacao).pipe(finalize(() => this.finalizando = false)).subscribe({
      next: c => {
        this.consulta = c;
        this.router.navigate(['/medico/consulta', this.id]);
      },
      error: e => this.erro = e?.error?.message ?? 'Não foi possível finalizar a consulta.'
    });
  }
}