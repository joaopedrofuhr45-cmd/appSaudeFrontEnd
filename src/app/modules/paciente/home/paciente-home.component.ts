import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { ConsultaPaciente } from '../../../model/consulta/consulta.model';
import { StatusConsulta } from '../../../shared/status-badge/status-badge.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/stat-card/stat-card.component';
import { ConsultaRowComponent } from '../../../shared/consulta-row/consulta-row.component';
@Component({selector:'app-paciente-home',standalone:true,imports:[CommonModule,PageHeaderComponent,StatCardComponent,ConsultaRowComponent,RouterLink],templateUrl:'./paciente-home.component.html',styleUrl:'./paciente-home.component.css'})
export class PacienteHomeComponent implements OnInit {
 private readonly consultaService=inject(ConsultaService); consultas:ConsultaPaciente[]=[]; carregando=true; erro='';
 ngOnInit():void{this.consultaService.listarMinhasConsultas().subscribe({next:d=>{this.consultas=d;this.carregando=false},error:()=>{this.erro='Não foi possível carregar suas consultas.';this.carregando=false}});}
 get proximas():ConsultaPaciente[]{const agora=new Date();return this.consultas.filter(c=>['AGENDADO','CONFIRMADO','EM_ESPERA'].includes(c.status)).filter(c=>new Date(c.dataHora)>=agora).sort((a,b)=>new Date(a.dataHora).getTime()-new Date(b.dataHora).getTime()).slice(0,2);}
 get totalRealizadas():number{return this.consultas.filter(c=>c.status==='CONCLUIDO').length;}
 statusParaBadge(status:ConsultaPaciente['status']):StatusConsulta{return status.toLowerCase().replace('_','-') as StatusConsulta;}
 detalhe(c:ConsultaPaciente):string{return [c.especialidade,new Date(c.dataHora).toLocaleDateString('pt-BR'),c.unidade||c.modalidade].filter(Boolean).join(' · ');}
 hora(c:ConsultaPaciente):string{return new Date(c.dataHora).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});}
 statusTexto(status:ConsultaPaciente['status']):string{return ({AGENDADO:'Agendada',CONFIRMADO:'Confirmada',EM_ESPERA:'Pendente',CANCELADO:'Cancelada',CONCLUIDO:'Concluída'})[status];}
}