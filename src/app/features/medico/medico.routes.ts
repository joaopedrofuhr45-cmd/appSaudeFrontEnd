import { Routes } from '@angular/router';

export const MEDICO_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/home/medico-home.component').then((m) => m.MedicoHomeComponent),
  },
  {
    path: 'consulta/:id',
    loadComponent: () =>
      import('./pages/consulta/dados-consulta.component').then((m) => m.DadosConsultaComponent),
  },
  {
    path: 'consulta/:id/atendimento',
    loadComponent: () =>
      import('./pages/atendimento/atendimento-medico.component').then(
        (m) => m.AtendimentoMedicoComponent
      ),
  },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./pages/configuracoes/configuracoes-medico.component').then(
        (m) => m.ConfiguracoesMedicoComponent
      ),
  },
];
