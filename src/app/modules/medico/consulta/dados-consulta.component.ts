import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
@Component({selector:'app-dados-consulta',standalone:true,imports:[SidebarComponent,PageHeaderComponent,StatusBadgeComponent],templateUrl:'./dados-consulta.component.html',styleUrl:'./dados-consulta.component.css'})
export class DadosConsultaComponent { readonly id:string|null; constructor(route:ActivatedRoute){this.id=route.snapshot.paramMap.get('id');} }