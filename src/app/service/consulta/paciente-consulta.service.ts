import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environment/environment';
import {
  OpcaoMedico,
  PacienteConsulta,
  RegistroHistoricoPaciente,
  SolicitarConsulta,
} from '../../model/consulta/paciente-consulta';

@Injectable({ providedIn: 'root' })
export class PacienteConsultaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');

  listarMinhasConsultas(): Observable<PacienteConsulta[]> {
    return this.http.get<PacienteConsulta[]>(`${this.baseUrl}/consultas/paciente`, {
      withCredentials: true,
    });
  }

  solicitarAgendamento(dados: SolicitarConsulta): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/consultas`, dados, {
      withCredentials: true,
    });
  }

  listarHistorico(): Observable<RegistroHistoricoPaciente[]> {
    return this.http.get<RegistroHistoricoPaciente[]>(`${this.baseUrl}/consultas/paciente/historico`, {
      withCredentials: true,
    });
  }

  listarEspecialidades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/especialidades`, {
      withCredentials: true,
    });
  }

  listarMedicos(especialidade: string): Observable<OpcaoMedico[]> {
    const params = new HttpParams().set('especialidade', especialidade);
    return this.http.get<OpcaoMedico[]>(`${this.baseUrl}/medicos`, {
      params,
      withCredentials: true,
    });
  }
}
