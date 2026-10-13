import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { ConfiguracoesMedicoComponent } from './configuracoes-medico.component';
import { MedicoService } from '@features/medico/services/medico.service';

describe('ConfiguracoesMedicoComponent', () => {
  let fixture: ComponentFixture<ConfiguracoesMedicoComponent>;
  let service: jasmine.SpyObj<MedicoService>;
  beforeEach(async () => {
    service = jasmine.createSpyObj<MedicoService>('MedicoService', ['obterMeuPerfil', 'atualizarPerfil', 'alterarSenha']);
    service.obterMeuPerfil.and.returnValue(of({ nome: 'Dra. Ana', email: 'ana@example.com', telefone: '11999990000', crm: '123', especialidade: 'Pediatria' } as any));
    service.atualizarPerfil.and.returnValue(of({ nome: 'Dra. Ana', email: 'ana@example.com', telefone: '11999990000' } as any));
    service.alterarSenha.and.returnValue(of(void 0));
    await TestBed.configureTestingModule({ imports: [ConfiguracoesMedicoComponent], providers: [provideRouter([]), { provide: MedicoService, useValue: service }] }).compileComponents();
    fixture = TestBed.createComponent(ConfiguracoesMedicoComponent);
    fixture.detectChanges();
  });
  it('loads the doctor profile', () => {
    expect(fixture.componentInstance.nome).toBe('Dra. Ana');
    expect(fixture.componentInstance.crm).toBe('123');
    expect(fixture.componentInstance.carregando).toBeFalse();
  });
  it('does not submit a mismatched password confirmation', () => {
    Object.assign(fixture.componentInstance, { senhaAtual: 'current', novaSenha: 'new-password', confirmarSenha: 'different' });
    fixture.componentInstance.salvarSenha();
    expect(service.alterarSenha).not.toHaveBeenCalled();
    expect(fixture.componentInstance.erro).toContain('Confira as senhas');
  });
  it('updates a valid profile', () => {
    fixture.componentInstance.salvar();
    expect(service.atualizarPerfil).toHaveBeenCalled();
    expect(fixture.componentInstance.mensagem).toContain('sucesso');
  });
});
