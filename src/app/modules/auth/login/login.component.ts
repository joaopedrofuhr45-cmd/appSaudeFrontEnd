import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  perfil: 'paciente' | 'atendente' | 'medico' = 'paciente';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.perfil = this.route.snapshot.data['perfil'];
  }
}