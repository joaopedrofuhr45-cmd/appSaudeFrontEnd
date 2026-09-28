import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
@Component({selector:'app-atendimento-medico',standalone:true,imports:[SidebarComponent,PageHeaderComponent],templateUrl:'./atendimento-medico.component.html',styleUrl:'./atendimento-medico.component.css'})
export class AtendimentoMedicoComponent { readonly id:string|null; constructor(route:ActivatedRoute){this.id=route.snapshot.paramMap.get('id');} }