import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { resolverFotoUrl } from '@shared/utils/foto-url';

import { environment } from '@environment/environment';
import { ConsultaPaciente, HistoricoConsulta } from '@features/consulta/models/consulta.model';
import { AlterarSenhaPaciente, PacientePerfil } from '@features/paciente/models/paciente-perfil';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');

  obterMeuPerfil(): Observable<PacientePerfil> {
    return this.http.get<PacientePerfil>(`${this.baseUrl}/pacientes/me`).pipe(map(resolverFotoUrl));
  }

  atualizarPerfil(perfil: PacientePerfil): Observable<PacientePerfil> {
    return this.http.put<PacientePerfil>(`${this.baseUrl}/pacientes/me`, perfil).pipe(map(resolverFotoUrl));
  }

  alterarSenha(dados: AlterarSenhaPaciente): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/pacientes/me/senha`, dados);
  }

  listarMinhasConsultas(): Observable<ConsultaPaciente[]> {
    return this.http.get<ConsultaPaciente[]>(`${this.baseUrl}/pacientes/me/consultas`);
  }

  listarHistorico(): Observable<HistoricoConsulta[]> {
    return this.http.get<HistoricoConsulta[]>(`${this.baseUrl}/pacientes/me/consultas/historico`);
  }
}
