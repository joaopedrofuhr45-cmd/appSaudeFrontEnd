import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import {
  Consulta, ConsultaAgendamento, ConsultaDetalhe, ConsultaPaciente,
  HistoricoConsulta, MedicoOpcao, PacienteOpcao
} from '@features/consulta/models/consulta.model';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');

  listarPorData(data: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.baseUrl}/consultas`, {
      params: new HttpParams().set('data', data), withCredentials: true
    });
  }

  obter(id: number | string): Observable<ConsultaDetalhe> {
    return this.http.get<ConsultaDetalhe>(`${this.baseUrl}/consultas/${id}`, { withCredentials: true });
  }

  finalizar(id: number | string, observacao: string): Observable<ConsultaDetalhe> {
    return this.http.patch<ConsultaDetalhe>(`${this.baseUrl}/consultas/${id}/finalizar`, { observacao }, { withCredentials: true });
  }

  listarMinhasConsultas(): Observable<ConsultaPaciente[]> {
    return this.http.get<ConsultaPaciente[]>(`${this.baseUrl}/consultas/paciente`, { withCredentials: true });
  }

  listarHistorico(): Observable<HistoricoConsulta[]> {
    return this.http.get<HistoricoConsulta[]>(`${this.baseUrl}/consultas/paciente/historico`, { withCredentials: true });
  }

  agendar(dados: ConsultaAgendamento): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/consultas`, dados, { withCredentials: true });
  }

  listarEspecialidades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/especialidades`, { withCredentials: true });
  }

  listarMedicos(especialidade?: string): Observable<MedicoOpcao[]> {
    let params = new HttpParams();
    if (especialidade) params = params.set('especialidade', especialidade);
    return this.http.get<MedicoOpcao[]>(`${this.baseUrl}/medicos`, { params, withCredentials: true });
  }

  buscarPacientes(nome: string): Observable<PacienteOpcao[]> {
    return this.http.get<PacienteOpcao[]>(`${this.baseUrl}/pacientes`, {
      params: new HttpParams().set('nome', nome),
      withCredentials: true
    });
  }
}