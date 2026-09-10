import { Routes } from '@angular/router';
import { TelaInicialComponent } from './modules/tela-inicial/tela-inicial.component';

export const routes: Routes = [
    {path: '', component: TelaInicialComponent},
     { path: 'menu-inicial', component: TelaInicialComponent}
];
