import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { SidebarComponent } from '@shared/ui/sidebar/sidebar.component';
import { AvatarUploadComponent } from '@shared/ui/avatar-upload/avatar-upload.component';
import { AlterarSenhaComponent } from '@shared/ui/alterar-senha/alterar-senha.component';
import { PageHeaderComponent } from '@shared/ui/page-header/page-header.component';
import { AtendenteService } from '@features/atendente/services/atendente.service';

@Component({selector:'app-configuracoes-atendente',standalone:true,imports:[FormsModule,SidebarComponent,PageHeaderComponent,AvatarUploadComponent,AlterarSenhaComponent],templateUrl:'./configuracoes-atendente.component.html',styleUrl:'./configuracoes-atendente.component.css'})
export class ConfiguracoesAtendenteComponent implements OnInit {
 private readonly service=inject(AtendenteService);
 nome=''; email=''; telefone=''; setor=''; fotoUrl:string|null|undefined=null;erroSenha='';   mensagem=''; erro=''; salvando=false; salvandoSenha=false; carregando=true;
 ngOnInit():void{this.service.obterMeuPerfil().pipe(finalize(()=>this.carregando=false)).subscribe({next:p=>{this.nome=p.nome;this.email=p.email;this.telefone=p.telefone;this.fotoUrl=p.fotoUrl;this.setor=p.setor;},error:()=>this.erro='Não foi possível carregar seus dados.'});}
 salvarDados():void{this.mensagem='';this.erro='';this.salvando=true;this.service.atualizarPerfil({nome:this.nome,email:this.email,telefone:this.telefone}).pipe(finalize(()=>this.salvando=false)).subscribe({next:p=>{this.nome=p.nome;this.email=p.email;this.telefone=p.telefone;this.mensagem='Dados atualizados com sucesso.';},error:e=>this.erro=e?.error?.message??'Não foi possível salvar seus dados.'});}
 @ViewChild(AlterarSenhaComponent) senhaForm?:AlterarSenhaComponent;
 salvarSenha(novaSenha:string):void{this.mensagem='';this.erro='';this.erroSenha='';this.salvandoSenha=true;this.service.alterarSenha({novaSenha}).pipe(finalize(()=>this.salvandoSenha=false)).subscribe({next:()=>{this.senhaForm?.limpar();this.mensagem='Senha atualizada com sucesso.';},error:e=>this.erroSenha=e?.error?.message??'Não foi possível atualizar a senha.'});}
}
