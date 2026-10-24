import { Routes } from '@angular/router';

export const PACIENTE_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/home/paciente-home.component').then((m) => m.PacienteHomeComponent),
  },
  {
    path: 'agendar-consulta',
    loadComponent: () =>
      import('./pages/agendar-consulta/agendar-consulta.component').then(
        (m) => m.AgendarConsultaComponent
      ),
  },
  {
    path: 'consultas-anteriores',
    loadComponent: () =>
      import('./pages/consultas-anteriores/consultas-anteriores.component').then(
        (m) => m.ConsultasAnterioresComponent
      ),
  },
  {
    path: 'consulta/:id',
    loadComponent: () =>
      import('./pages/detalhes-consulta/detalhes-consulta.component').then(
        (m) => m.DetalhesConsultaPacienteComponent
      ),
  },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./pages/configuracoes/configuracoes-paciente.component').then(
        (m) => m.ConfiguracoesPacienteComponent
      ),
  },
];
