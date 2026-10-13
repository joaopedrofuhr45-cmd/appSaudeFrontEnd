import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ConfiguracoesPacienteComponent } from './configuracoes-paciente.component';
import { PacienteService } from '@features/paciente/services/paciente.service';

describe('ConfiguracoesPacienteComponent', () => {
  let fixture: ComponentFixture<ConfiguracoesPacienteComponent>;
  let paciente: jasmine.SpyObj<PacienteService>;
  beforeEach(async () => {
    paciente = jasmine.createSpyObj<PacienteService>('PacienteService', ['obterMeuPerfil', 'atualizarPerfil', 'alterarSenha']);
    paciente.obterMeuPerfil.and.returnValue(of({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000' }));
    paciente.atualizarPerfil.and.returnValue(of({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000' }));
    paciente.alterarSenha.and.returnValue(of(void 0));
    await TestBed.configureTestingModule({ imports: [ConfiguracoesPacienteComponent], providers: [provideRouter([]), { provide: PacienteService, useValue: paciente }] }).compileComponents();
    fixture = TestBed.createComponent(ConfiguracoesPacienteComponent);
    fixture.detectChanges();
  });
  it('loads profile data into the form', () => {
    expect(fixture.componentInstance.dados.value.nome).toBe('Ana');
    expect(fixture.componentInstance.carregando).toBeFalse();
  });
  it('validates and saves profile data', () => {
    fixture.componentInstance.dados.setValue({ nome: 'Ana', email: 'ana@example.com', telefone: '11999990000' });
    fixture.componentInstance.salvarDados();
    expect(paciente.atualizarPerfil).toHaveBeenCalled();
    expect(fixture.componentInstance.mensagemDados).toBe('Dados atualizados.');
  });
  it('checks password confirmation before changing a password', () => {
    fixture.componentInstance.senha.setValue({ atual: 'old-pass', nova: 'new-pass-123', confirmar: 'different' });
    fixture.componentInstance.salvarSenha();
    expect(paciente.alterarSenha).not.toHaveBeenCalled();
    expect(fixture.componentInstance.mensagemSenha).toContain('confirmação');
  });
});
