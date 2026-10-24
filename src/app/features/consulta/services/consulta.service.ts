import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import {
  Consulta, ConsultaAgendamento, ConsultaDetalhe, MedicoOpcao, PacienteOpcao
} from '@features/consulta/models/consulta.model';

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');

  /** Agenda geral do dia (atendente). Médico: MedicoService.listarAgenda. Paciente: PacienteService.listarMinhasConsultas. */
  listarPorData(data: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.baseUrl}/consultas`, {
      params: new HttpParams().set('data', data)
    });
  }

  obter(id: number | string): Observable<ConsultaDetalhe> {
    return this.http.get<ConsultaDetalhe>(`${this.baseUrl}/consultas/${id}`);
  }

  finalizar(id: number | string, observacao: string): Observable<ConsultaDetalhe> {
    return this.http.patch<ConsultaDetalhe>(`${this.baseUrl}/consultas/${id}/finalizar`, { observacao });
  }

  cancelar(id: number | string): Observable<ConsultaDetalhe> {
    return this.http.patch<ConsultaDetalhe>(`${this.baseUrl}/consultas/${id}/cancelar`, {});
  }

  agendar(dados: ConsultaAgendamento): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/consultas`, dados);
  }

  listarEspecialidades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/especialidades`);
  }

  listarMedicos(especialidade?: string): Observable<MedicoOpcao[]> {
    let params = new HttpParams();
    if (especialidade) params = params.set('especialidade', especialidade);
    return this.http.get<MedicoOpcao[]>(`${this.baseUrl}/medicos`, { params });
  }

  buscarPacientes(nome: string): Observable<PacienteOpcao[]> {
    return this.http.get<PacienteOpcao[]>(`${this.baseUrl}/pacientes`, {
      params: new HttpParams().set('nome', nome)
    });
  }
}