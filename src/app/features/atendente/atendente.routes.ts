import { Routes } from '@angular/router';

export const ATENDENTE_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/atendente-home.component').then((m) => m.AtendenteHomeComponent),
  },
  {
    path: 'novo-agendamento',
    loadComponent: () =>
      import('./pages/novo-agendamento/novo-agendamento.component').then(
        (m) => m.NovoAgendamentoComponent
      ),
  },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./pages/configuracoes/configuracoes-atendente.component').then(
        (m) => m.ConfiguracoesAtendenteComponent
      ),
  },
];
