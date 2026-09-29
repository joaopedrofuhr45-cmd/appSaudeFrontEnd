import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { ConsultaDetalhe } from '../../../model/consulta/consulta.model';

@Component({
  selector: 'app-dados-consulta',
  standalone: true,
  imports: [SidebarComponent, PageHeaderComponent, StatusBadgeComponent],
  templateUrl: './dados-consulta.component.html',
  styleUrl: './dados-consulta.component.css'
})
export class DadosConsultaComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ConsultaService);

  readonly id = this.route.snapshot.paramMap.get('id');
  consulta: ConsultaDetalhe | null = null;
  carregando = true;
  erro = '';

  ngOnInit(): void {
    if (!this.id) { this.erro = 'Consulta inválida.'; this.carregando = false; return; }
    this.service.obter(this.id).pipe(finalize(() => this.carregando = false)).subscribe({
      next: c => this.consulta = c,
      error: e => this.erro = e?.error?.message ?? 'Não foi possível carregar a consulta.'
    });
  }

  abrirAtendimento(): void {
    if (this.id) this.router.navigate(['/medico/consulta', this.id, 'atendimento']);
  }
}