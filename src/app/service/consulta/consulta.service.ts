import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import {
  Consulta,
  ConsultaAgendamento,
  ConsultaPaciente,
  HistoricoConsulta,
  MedicoOpcao,
} from '../../model/consulta/consulta.model';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');

  listarPorData(data: string): Observable<Consulta[]> {
    const params = new HttpParams().set('data', data);
    return this.http.get<Consulta[]>(`${this.baseUrl}/consultas`, {
      params,
      withCredentials: true,
    });
  }

  listarMinhasConsultas(): Observable<ConsultaPaciente[]> {
    return this.http.get<ConsultaPaciente[]>(`${this.baseUrl}/consultas/paciente`, {
      withCredentials: true,
    });
  }

  listarHistorico(): Observable<HistoricoConsulta[]> {
    return this.http.get<HistoricoConsulta[]>(`${this.baseUrl}/consultas/paciente/historico`, {
      withCredentials: true,
    });
  }

  agendar(dados: ConsultaAgendamento): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/consultas`, dados, {
      withCredentials: true,
    });
  }

  listarEspecialidades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/especialidades`, {
      withCredentials: true,
    });
  }

  listarMedicos(especialidade?: string): Observable<MedicoOpcao[]> {
    let params = new HttpParams();

    if (especialidade) {
      params = params.set('especialidade', especialidade);
    }

    return this.http.get<MedicoOpcao[]>(`${this.baseUrl}/medicos`, {
      params,
      withCredentials: true,
    });
  }
}
