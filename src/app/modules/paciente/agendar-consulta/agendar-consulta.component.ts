import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { ConsultaService } from '../../../service/consulta/consulta.service';
import { MedicoOpcao } from '../../../model/consulta/consulta.model';

@Component({selector:'app-agendar-consulta',standalone:true,imports:[ReactiveFormsModule,PageHeaderComponent],templateUrl:'./agendar-consulta.component.html',styleUrl:'./agendar-consulta.component.css'})
export class AgendarConsultaComponent implements OnInit {
 private readonly fb=inject(FormBuilder); private readonly consultaService=inject(ConsultaService);
 especialidades:string[]=[]; medicos:MedicoOpcao[]=[]; enviando=false; carregandoOpcoes=true; mensagem='';
 readonly formulario=this.fb.group({especialidade:['',Validators.required],medico:[null as number|null,Validators.required],data:['',Validators.required],horario:['',Validators.required],observacao:['']});
 ngOnInit():void{this.consultaService.listarEspecialidades().pipe(finalize(()=>this.carregandoOpcoes=false)).subscribe({next:d=>{this.especialidades=d;if(d.length){this.formulario.controls.especialidade.setValue(d[0]);this.carregarMedicos();}},error:()=>this.mensagem='Não foi possível carregar as especialidades.'});}
 carregarMedicos():void{const especialidade=this.formulario.controls.especialidade.value;this.formulario.controls.medico.setValue(null);if(!especialidade){this.medicos=[];return;}this.consultaService.listarMedicos(especialidade).subscribe({next:d=>this.medicos=d,error:()=>this.mensagem='Não foi possível carregar os médicos disponíveis.'});}
 solicitar():void{this.mensagem='';this.formulario.markAllAsTouched();if(this.formulario.invalid){this.mensagem='Preencha a especialidade, o médico, a data e o horário.';return;}const d=this.formulario.getRawValue();this.enviando=true;this.consultaService.agendar({medicoId:d.medico!,tipoConsulta:d.especialidade!,dataHora:`${d.data}T${d.horario}:00`,observacao:d.observacao||''}).pipe(finalize(()=>this.enviando=false)).subscribe({next:()=>{this.mensagem='Solicitação de consulta enviada.';this.formulario.reset();},error:()=>this.mensagem='Não foi possível solicitar a consulta. Tente novamente.'});}
}