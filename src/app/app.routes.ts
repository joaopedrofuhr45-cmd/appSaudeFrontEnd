import { Routes } from '@angular/router';
import { TelaInicialComponent } from './features/landing/pages/tela-inicial/tela-inicial.component';
import { roleGuard } from './core/auth/guards/role.guard';

export const routes: Routes = [
  // Tela inicial fica no bundle principal (primeira coisa que o usuário vê).
  { path: '', component: TelaInicialComponent, pathMatch: 'full' },
  {
    path: 'menu-inicial',
    loadComponent: () =>
      import('./features/landing/pages/menu-inicial/menu-inicial.component').then(
        (m) => m.MenuInicialComponent
      ),
  },
  {
    path: 'login-paciente',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
    data: { perfil: 'paciente' },
  },
  {
    path: 'login-atendente',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
    data: { perfil: 'atendente' },
  },
  {
    path: 'login-medico',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
    data: { perfil: 'medico' },
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./features/auth/pages/cadastro/cadastro.component').then(
        (m) => m.CadastroPacienteComponent
      ),
  },
  {
    path: 'atendente',
    canActivate: [roleGuard],
    data: { roles: ['ATENDENTE'] },
    loadChildren: () =>
      import('./features/atendente/atendente.routes').then((m) => m.ATENDENTE_ROUTES),
  },
  {
    path: 'medico',
    canActivate: [roleGuard],
    data: { roles: ['MEDICO'] },
    loadChildren: () => import('./features/medico/medico.routes').then((m) => m.MEDICO_ROUTES),
  },
  {
    path: 'paciente',
    canActivate: [roleGuard],
    data: { roles: ['USUARIO'] },
    loadComponent: () =>
      import('./features/paciente/layout/paciente-layout.component').then(
        (m) => m.PacienteLayoutComponent
      ),
    loadChildren: () =>
      import('./features/paciente/paciente.routes').then((m) => m.PACIENTE_ROUTES),
  },
];
