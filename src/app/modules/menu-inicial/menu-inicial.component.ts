import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-menu-inicial',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './menu-inicial.component.html',
  styleUrl: './menu-inicial.component.css'
})
export class MenuInicialComponent {

}
