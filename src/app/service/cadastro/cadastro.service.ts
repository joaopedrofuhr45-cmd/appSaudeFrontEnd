import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import { CadastroRequest } from '../../model/auth/cadastro-request';

@Injectable({ providedIn: 'root' })
export class CadastroService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  cadastrar(dados: CadastroRequest): Observable<void> {
    const payload: CadastroRequest = {
      nome: dados.nome,
      email: dados.email,
      cpf: dados.cpf,
      telefone: dados.telefone,
      senha: dados.senha,
    };

    return this.http.post<void>(`${this.apiUrl}/cadastro`, payload);
  }
}
