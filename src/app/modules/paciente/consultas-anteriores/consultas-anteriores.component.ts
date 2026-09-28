import { Component,OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { StatusBadgeComponent,StatusConsulta } from '../../../shared/status-badge/status-badge.component';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { ConsultaPaciente } from '../../../model/consulta/consulta.model';
@Component({selector:'app-consultas-anteriores',standalone:true,imports:[CommonModule,FormsModule,PageHeaderComponent,StatusBadgeComponent],templateUrl:'./consultas-anteriores.component.html',styleUrl:'./consultas-anteriores.component.css'})
export class ConsultasAnterioresComponent implements OnInit {
 private readonly consultaService=inject(ConsultaService); busca='';periodo='Últimos 12 meses';situacao='Todas';consultas:ConsultaPaciente[]=[];carregando=true;erro='';
 ngOnInit():void{this.consultaService.listarMinhasConsultas().subscribe({next:d=>{this.consultas=d;this.carregando=false},error:()=>{this.erro='Não foi possível carregar suas consultas.';this.carregando=false}});}
 get filtradas():ConsultaPaciente[]{const termo=this.busca.trim().toLocaleLowerCase('pt-BR');const limite=this.periodo==='Últimos 30 dias'?30:this.periodo==='Últimos 6 meses'?180:365;return this.consultas.filter(c=>{const okBusca=!termo||`${c.medico} ${c.especialidade}`.toLocaleLowerCase('pt-BR').includes(termo);const okSit=this.situacao==='Todas'||this.statusTexto(c.status)===this.situacao;const okPeriodo=Date.now()-new Date(c.dataHora).getTime()<=limite*86400000;return okBusca&&okSit&&okPeriodo&&new Date(c.dataHora).getTime()<Date.now()&&(c.status==='CONCLUIDO'||c.status==='CANCELADO');});}
 statusParaBadge(s:ConsultaPaciente['status']):StatusConsulta{return s.toLowerCase().replace('_','-') as StatusConsulta;}
 statusTexto(s:ConsultaPaciente['status']):string{return ({AGENDADO:'Agendada',CONFIRMADO:'Confirmada',EM_ESPERA:'Pendente',CANCELADO:'Cancelada',CONCLUIDO:'Concluída'})[s];}
 horario(d:string):string{return new Date(d).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});}
 classe(s:ConsultaPaciente['status']):string{return s==='CANCELADO'?'vermelho':'verde';}
}