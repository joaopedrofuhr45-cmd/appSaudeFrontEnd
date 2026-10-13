import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ConfiguracoesAtendenteComponent } from './configuracoes-atendente.component';
import { AtendenteService } from '@features/atendente/services/atendente.service';

describe('ConfiguracoesAtendenteComponent', () => {
  let fixture: ComponentFixture<ConfiguracoesAtendenteComponent>;
  let service: jasmine.SpyObj<AtendenteService>;
  beforeEach(async () => {
    service = jasmine.createSpyObj<AtendenteService>('AtendenteService', ['obterMeuPerfil', 'atualizarPerfil', 'alterarSenha']);
    service.obterMeuPerfil.and.returnValue(of({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000', setor: 'Recepção' }));
    service.atualizarPerfil.and.returnValue(of({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000', setor: 'Recepção' }));
    service.alterarSenha.and.returnValue(of(void 0));
    await TestBed.configureTestingModule({ imports: [ConfiguracoesAtendenteComponent], providers: [provideRouter([]), { provide: AtendenteService, useValue: service }] }).compileComponents();
    fixture = TestBed.createComponent(ConfiguracoesAtendenteComponent);
    fixture.detectChanges();
  });
  it('loads profile values and saves them', () => {
    expect(fixture.componentInstance.nome).toBe('Ana');
    expect(fixture.componentInstance.setor).toBe('Recepção');
    fixture.componentInstance.salvarDados();
    expect(service.atualizarPerfil).toHaveBeenCalled();
    expect(fixture.componentInstance.mensagem).toContain('sucesso');
  });
  it('validates the password length and confirmation', () => {
    Object.assign(fixture.componentInstance, { senhaAtual: 'old', novaSenha: 'short', confirmarSenha: 'short' });
    fixture.componentInstance.salvarSenha();
    expect(service.alterarSenha).not.toHaveBeenCalled();
    expect(fixture.componentInstance.erro).toContain('pelo menos 8 caracteres');
  });
  it('changes a valid password and clears its fields', () => {
    Object.assign(fixture.componentInstance, { senhaAtual: 'old', novaSenha: 'new-password', confirmarSenha: 'new-password' });
    fixture.componentInstance.salvarSenha();
    expect(service.alterarSenha).toHaveBeenCalledWith({ senhaAtual: 'old', novaSenha: 'new-password' });
    expect(fixture.componentInstance.novaSenha).toBe('');
    expect(fixture.componentInstance.mensagem).toContain('Senha atualizada');
  });
});
