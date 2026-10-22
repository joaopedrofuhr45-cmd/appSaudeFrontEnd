import { Routes } from '@angular/router';
import { TelaInicialComponent } from './features/landing/pages/tela-inicial/tela-inicial.component';
import { MenuInicialComponent } from './features/landing/pages/menu-inicial/menu-inicial.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { CadastroPacienteComponent } from './features/auth/pages/cadastro/cadastro.component';
import { AtendenteHomeComponent } from './features/atendente/pages/home/home.component';
import { NovoAgendamentoComponent } from './features/atendente/pages/novo-agendamento/novo-agendamento.component';
import { ConfiguracoesAtendenteComponent } from './features/atendente/pages/configuracoes/configuracoes-atendente.component';
import { MedicoHomeComponent } from './features/medico/pages/home/medico-home.component';
import { DadosConsultaComponent } from './features/medico/pages/consulta/dados-consulta.component';
import { AtendimentoMedicoComponent } from './features/medico/pages/atendimento/atendimento-medico.component';
import { ConfiguracoesMedicoComponent } from './features/medico/pages/configuracoes/configuracoes-medico.component';
import { PacienteLayoutComponent } from './features/paciente/pages/layout/paciente-layout.component';
import { PacienteHomeComponent } from './features/paciente/pages/home/paciente-home.component';
import { AgendarConsultaComponent } from './features/paciente/pages/agendar-consulta/agendar-consulta.component';
import { ConsultasAnterioresComponent } from './features/paciente/pages/consultas-anteriores/consultas-anteriores.component';
import { HistoricoPacienteComponent } from './features/paciente/pages/historico/historico-paciente.component';
import { ConfiguracoesPacienteComponent } from './features/paciente/pages/configuracoes/configuracoes-paciente.component';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: '', component: TelaInicialComponent, pathMatch: 'full' },
  { path: 'menu-inicial', component: MenuInicialComponent },
  {
    path: 'login-paciente',
    component: LoginComponent,
    data: { perfil: 'paciente' },
  },
  {
    path: 'login-atendente',
    component: LoginComponent,
    data: { perfil: 'atendente' },
  },
  {
    path: 'login-medico',
    component: LoginComponent,
    data: { perfil: 'medico' },
  },
  { path: 'cadastro', component: CadastroPacienteComponent },
  {
    path: 'atendente',
    canActivate: [roleGuard],
    data: { roles: ['ATENDENTE'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: AtendenteHomeComponent },
      { path: 'novo-agendamento', component: NovoAgendamentoComponent },
      { path: 'configuracoes', component: ConfiguracoesAtendenteComponent },
    ],
  },
  {
    path: 'medico',
    canActivate: [roleGuard],
    data: { roles: ['MEDICO'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: MedicoHomeComponent },
      { path: 'consulta/:id', component: DadosConsultaComponent },
      {
        path: 'consulta/:id/atendimento',
        component: AtendimentoMedicoComponent,
      },
      { path: 'configuracoes', component: ConfiguracoesMedicoComponent },
    ],
  },
  {
    path: 'paciente',
    component: PacienteLayoutComponent,
    canActivate: [roleGuard],
    data: { roles: ['USUARIO'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: PacienteHomeComponent },
      { path: 'agendar-consulta', component: AgendarConsultaComponent },
      { path: 'consultas-anteriores', component: ConsultasAnterioresComponent },
      { path: 'historico', component: HistoricoPacienteComponent },
      { path: 'configuracoes', component: ConfiguracoesPacienteComponent },
    ],
  },
];
