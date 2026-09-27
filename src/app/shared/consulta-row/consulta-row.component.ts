import { Component, Input } from '@angular/core';
import { StatusBadgeComponent, StatusConsulta } from '../status-badge/status-badge.component';

@Component({
  selector: 'app-consulta-row',
  standalone: true,
  imports: [StatusBadgeComponent],
  templateUrl: './consulta-row.component.html',
  styleUrl: './consulta-row.component.css'
})
export class ConsultaRowComponent {
  @Input() horario = '';
  @Input() nome = '';
  @Input() detalhe = '';
  @Input() status: StatusConsulta = 'agendado';
  @Input() statusTexto = '';
  @Input() destaque = false;
}