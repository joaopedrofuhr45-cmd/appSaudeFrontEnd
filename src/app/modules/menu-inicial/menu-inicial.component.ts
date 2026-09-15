import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-menu-inicial',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './menu-inicial.component.html',
  styleUrls: ['./menu-inicial.component.css']
})
export class MenuInicialComponent {
  constructor(private router: Router) {}

  irPara(rota: string) {
    this.router.navigate([rota]);
  }
}
