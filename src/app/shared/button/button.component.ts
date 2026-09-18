import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  variante:
    | 'primario'
    | 'perigo'
    | 'secundario'
    | 'sucesso'
    | 'menu'
    | 'voltar' = 'primario';

  @Input() type: 'button' | 'submit' = 'button';

  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();
}
