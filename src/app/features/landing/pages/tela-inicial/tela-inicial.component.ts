import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '@shared/header/header.component';
import { RevealDirective } from '@shared/reveal/reveal.component';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [RouterLink, HeaderComponent, RevealDirective],
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent {}