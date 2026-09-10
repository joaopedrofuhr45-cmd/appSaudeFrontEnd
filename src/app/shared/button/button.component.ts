import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variante: 'primario' | 'perigo' | 'secundario' | 'sucesso' | 'menu' = 'primario';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
}
