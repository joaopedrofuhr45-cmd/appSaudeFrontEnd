import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CadastroService } from './cadastro.service';

describe('CadastroService', () => {

  let service: CadastroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CadastroService
      ]
    });

    service = TestBed.inject(CadastroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Verifica se o service foi criado
  it('deve criar o CadastroService', () => {
    expect(service).toBeTruthy();
  });

 it('deve realizar o cadastro com sucesso', () => {

  const paciente = {
    nome: 'João Pedro',
    email: 'joao@email.com',
    cpf: '52998224725',
    telefone: '11999999999',
    senha: '123456',
    confirmarSenha: '123456'
  };

  service.cadastrar(paciente).subscribe(resposta => {
    expect(resposta).toBeTruthy();
  });

  const req = httpMock.expectOne('URL_DO_SEU_BACKEND');

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(paciente);

  req.flush({
    mensagem: 'Cadastro realizado com sucesso'
  });
});
});
