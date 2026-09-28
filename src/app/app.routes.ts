import { Routes } from '@angular/router';
import { TelaInicialComponent } from './modules/tela-inicial/tela-inicial.component';
import { MenuInicialComponent } from './modules/menu-inicial/menu-inicial.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { CadastroPacienteComponent } from './modules/auth/cadastro/cadastro.component';
import { AtendenteHomeComponent } from './modules/atendente/home/home.component';
import { NovoAgendamentoComponent } from './modules/atendente/novo-agendamento/novo-agendamento.component';
import { ConfiguracoesAtendenteComponent } from './modules/atendente/configuracoes/configuracoes-atendente.component';
import { MedicoHomeComponent } from './modules/medico/home/medico-home.component';
import { DadosConsultaComponent } from './modules/medico/consulta/dados-consulta.component';
import { AtendimentoMedicoComponent } from './modules/medico/atendimento/atendimento-medico.component';
import { ConfiguracoesMedicoComponent } from './modules/medico/configuracoes/configuracoes-medico.component';
import { PacienteLayoutComponent } from './modules/paciente/layout/paciente-layout.component';
import { PacienteHomeComponent } from './modules/paciente/home/paciente-home.component';
import { AgendarConsultaComponent } from './modules/paciente/agendar-consulta/agendar-consulta.component';
import { ConsultasAnterioresComponent } from './modules/paciente/consultas-anteriores/consultas-anteriores.component';
import { HistoricoPacienteComponent } from './modules/paciente/historico/historico-paciente.component';
import { ConfiguracoesPacienteComponent } from './modules/paciente/configuracoes/configuracoes-paciente.component';

export const routes: Routes = [
 {path:'',component:TelaInicialComponent,pathMatch:'full'},
 {path:'menu-inicial',component:MenuInicialComponent},
 {path:'login-paciente',component:LoginComponent,data:{perfil:'paciente'}},
 {path:'login-atendente',component:LoginComponent,data:{perfil:'atendente'}},
 {path:'login-medico',component:LoginComponent,data:{perfil:'medico'}},
 {path:'cadastro',component:CadastroPacienteComponent},
 {path:'atendente',children:[
   {path:'',pathMatch:'full',redirectTo:'home'},
   {path:'home',component:AtendenteHomeComponent},
   {path:'novo-agendamento',component:NovoAgendamentoComponent},
   {path:'configuracoes',component:ConfiguracoesAtendenteComponent}
 ]},
 {path:'medico',children:[
   {path:'',pathMatch:'full',redirectTo:'dashboard'},
   {path:'dashboard',component:MedicoHomeComponent},
   {path:'consulta/:id',component:DadosConsultaComponent},
   {path:'consulta/:id/atendimento',component:AtendimentoMedicoComponent},
   {path:'configuracoes',component:ConfiguracoesMedicoComponent}
 ]},
 {path:'paciente',component:PacienteLayoutComponent,children:[
   {path:'',pathMatch:'full',redirectTo:'dashboard'},
   {path:'dashboard',component:PacienteHomeComponent},
   {path:'agendar-consulta',component:AgendarConsultaComponent},
   {path:'consultas-anteriores',component:ConsultasAnterioresComponent},
   {path:'historico',component:HistoricoPacienteComponent},
   {path:'configuracoes',component:ConfiguracoesPacienteComponent}
 ]}
];