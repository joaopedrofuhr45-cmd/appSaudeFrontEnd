import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  @Input() rotaVoltar = '/menu-inicial';
  @Input() textoVoltar = 'Voltar ao menu inicial';
  @Input() acaoLabel?: string;
  @Input() acaoRota?: string;
}