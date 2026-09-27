import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Consulta } from '../../model/consulta/consulta-request'

@Injectable({ providedIn: 'root' })
export class ConsultaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace('/auth', '');

  listarPorData(data: string): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(`${this.baseUrl}/consultas`, {
      params: { data },
      withCredentials: true,
    });
  }
}