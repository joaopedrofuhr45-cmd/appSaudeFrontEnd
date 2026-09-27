import { Component, Input } from '@angular/core';

export type StatusConsulta = 'agendado' | 'confirmado' | 'em-espera' | 'cancelado' | 'concluido';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input() status: StatusConsulta = 'agendado';
  @Input() texto = '';
}