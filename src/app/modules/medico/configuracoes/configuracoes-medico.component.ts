import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';

@Component({
  selector:'app-configuracoes-medico',
  standalone:true,
  imports:[FormsModule,SidebarComponent,PageHeaderComponent],
  templateUrl:'./configuracoes-medico.component.html',
  styleUrl:'./configuracoes-medico.component.css'
})
export class ConfiguracoesMedicoComponent {
  nome='Dr. Carlos Almeida'; email='carlos.almeida@saude.com'; telefone='(11) 98765-4321'; mensagem='';
  salvar():void { this.mensagem='Dados prontos para integração com o perfil do médico.'; }
}