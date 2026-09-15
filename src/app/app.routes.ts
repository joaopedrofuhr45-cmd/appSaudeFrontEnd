import { Routes } from '@angular/router';
import { TelaInicialComponent } from './modules/tela-inicial/tela-inicial.component';
import { MenuInicialComponent } from './modules/menu-inicial/menu-inicial.component';
import { LoginComponent } from './modules/auth/login/login.component';


export const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  { path: 'menu-inicial', component: MenuInicialComponent },
  { path: 'login-paciente', component: LoginComponent, data: { perfil: 'paciente' } },
  { path: 'login-atendente', component: LoginComponent, data: { perfil: 'atendente' } },
  { path: 'login-medico', component: LoginComponent, data: { perfil: 'medico' } },
  { path: 'cadastro', component: CadastroComponent}
];
