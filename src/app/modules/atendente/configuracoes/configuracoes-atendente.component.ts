import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { PageHeaderComponent } from '../../../shared/page-header/page-header.component';
import { AtendenteService } from '../../../service/auth/atendente.service';

@Component({selector:'app-configuracoes-atendente',standalone:true,imports:[FormsModule,SidebarComponent,PageHeaderComponent],templateUrl:'./configuracoes-atendente.component.html',styleUrl:'./configuracoes-atendente.component.css'})
export class ConfiguracoesAtendenteComponent implements OnInit {
 private readonly service=inject(AtendenteService);
 nome=''; email=''; telefone=''; setor=''; senhaAtual=''; novaSenha=''; confirmarSenha=''; mensagem=''; erro=''; salvando=false; salvandoSenha=false; carregando=true;
 ngOnInit():void{this.service.obterMeuPerfil().pipe(finalize(()=>this.carregando=false)).subscribe({next:p=>{this.nome=p.nome;this.email=p.email;this.telefone=p.telefone;this.setor=p.setor;},error:()=>this.erro='Não foi possível carregar seus dados.'});}
 salvarDados():void{this.mensagem='';this.erro='';this.salvando=true;this.service.atualizarPerfil({nome:this.nome,email:this.email,telefone:this.telefone}).pipe(finalize(()=>this.salvando=false)).subscribe({next:p=>{this.nome=p.nome;this.email=p.email;this.telefone=p.telefone;this.mensagem='Dados atualizados com sucesso.';},error:e=>this.erro=e?.error?.message??'Não foi possível salvar seus dados.'});}
 salvarSenha():void{this.mensagem='';this.erro='';if(!this.senhaAtual||this.novaSenha.length<8||this.novaSenha!==this.confirmarSenha){this.erro='Confira as senhas. A nova senha deve ter pelo menos 8 caracteres.';return;}this.salvandoSenha=true;this.service.alterarSenha({senhaAtual:this.senhaAtual,novaSenha:this.novaSenha}).pipe(finalize(()=>this.salvandoSenha=false)).subscribe({next:()=>{this.senhaAtual=this.novaSenha=this.confirmarSenha='';this.mensagem='Senha atualizada com sucesso.';},error:e=>this.erro=e?.error?.message??'Não foi possível atualizar a senha.'});}
}
