import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AlterarSenha } from '../../model/auth/perfil-configuracao';
@Injectable({ providedIn: 'root' })
export class ContaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');
  alterarSenha(dados: AlterarSenha): Observable<void> {
    return this.http.patch<void>(this.baseUrl + '/conta/me/senha', dados, {
      withCredentials: true,
    });
  }
}
