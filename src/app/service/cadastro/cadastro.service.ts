import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface CadastroPacienteDto {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
}

@Injectable({ providedIn: 'root' })
export class CadastroService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  cadastrar(dto: CadastroPacienteDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/cadastro`, dto);
  }
}
