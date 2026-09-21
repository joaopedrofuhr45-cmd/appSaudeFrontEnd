import { CadastroService } from './../../../service/cadastro/cadastro.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroPacienteComponent } from './cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CadastroPacienteComponent', () => {
  let component: CadastroPacienteComponent;
  let fixture: ComponentFixture<CadastroPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CadastroPacienteComponent,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: CadastroService,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 1 - Verifica se o componente foi criado
  it('deve criar o componente com sucesso', () => {
    expect(component).toBeTruthy();
  });

  // 2 - Formulário inicialmente inválido
  it('deve iniciar o formulário como inválido', () => {
    expect(component.cadastroForm.valid).toBeFalse();
  });

  // 3 - Nome obrigatório
  it('deve invalidar o nome quando estiver vazio', () => {
    const campo = component.cadastroForm.get('nome');

    campo?.setValue("");

    expect(campo?.hasError('required')).toBeTrue();
  });

  // 4 - Nome com mais de 150 caracteres
  it('deve invalidar o nome quando ultrapassar 150 caracteres', () => {
    const campo = component.cadastroForm.get('nome');

    campo?.setValue('a'.repeat(151));

    expect(campo?.hasError('maxlength')).toBeTrue();
  });

  // 5 - E-mail obrigatório
  it('deve invalidar o email quando estiver vazio', () => {
    const campo = component.cadastroForm.get('email');

    campo?.setValue('');

    expect(campo?.hasError('required')).toBeTrue();
  });

  // 6 - E-mail inválido
  it('deve invalidar um email incorreto', () => {
    const campo = component.cadastroForm.get('email');

    campo?.setValue('email-invalido');

    expect(campo?.hasError('email')).toBeTrue();
  });

  // 7 - CPF obrigatório
  it('deve invalidar o CPF quando estiver vazio', () => {
    const campo = component.cadastroForm.get('cpf');

    campo?.setValue('');

    expect(campo?.hasError('required')).toBeTrue();
  });

  // 8 - Telefone obrigatório
  it('deve invalidar o telefone quando estiver vazio', () => {
    const campo = component.cadastroForm.get('telefone');

    campo?.setValue('');

    expect(campo?.hasError('required')).toBeTrue();
  });

  // 9 - Senha obrigatória
  it('deve invalidar a senha quando estiver vazia', () => {
    const campo = component.cadastroForm.get('senha');

    campo?.setValue('');

    expect(campo?.hasError('required')).toBeTrue();
  });

  // 10 - Senha com menos de 6 caracteres
  it('deve invalidar a senha com menos de 6 caracteres', () => {
    const campo = component.cadastroForm.get('senha');

    campo?.setValue('12345');

    expect(campo?.hasError('minlength')).toBeTrue();
  });

  // 11 - Confirmação de senha obrigatória
  it('deve invalidar confirmarSenha quando estiver vazio', () => {
    const campo = component.cadastroForm.get('confirmarSenha');

    campo?.setValue('');

    expect(campo?.hasError('required')).toBeTrue();
  });

  // 12 - Formulário válido
  it('deve ficar válido quando todos os dados estiverem corretos', () => {
    component.cadastroForm.setValue({
      nome: 'João Pedro',
      email: 'joao@email.com',
      cpf: '52998224725',
      telefone: '11999999999',
      senha: '123456',
      confirmarSenha: '123456'
    });

    expect(component.cadastroForm.valid).toBeTrue();
  });

});
