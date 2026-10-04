import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { AlterarSenhaPaciente, PacientePerfil } from '@features/paciente/models/paciente-perfil';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');

  obterMeuPerfil(): Observable<PacientePerfil> {
    return this.http.get<PacientePerfil>(`${this.baseUrl}/pacientes/me`, {
      withCredentials: true,
    });
  }

  atualizarPerfil(perfil: PacientePerfil): Observable<PacientePerfil> {
    return this.http.put<PacientePerfil>(`${this.baseUrl}/pacientes/me`, perfil, {
      withCredentials: true,
    });
  }

  alterarSenha(dados: AlterarSenhaPaciente): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/pacientes/me/senha`, dados, {
      withCredentials: true,
    });
  }
}
