import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { resolverFotoUrl } from '@shared/utils/foto-url';
import { environment } from '@environment/environment';
import { FotoPerfilResponse } from '@shared/models/perfil-configuracao';

export type RecursoPerfil = 'pacientes' | 'medicos' | 'atendentes';

@Injectable({ providedIn: 'root' })
export class FotoPerfilService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl.replace(/\/auth\/?$/, '');

  enviar(recurso: RecursoPerfil, arquivo: File): Observable<FotoPerfilResponse> {
    const form = new FormData();
    form.append('foto', arquivo);
    return this.http.put<FotoPerfilResponse>(`${this.baseUrl}/${recurso}/me/foto`, form).pipe(map(resolverFotoUrl));
  }

  remover(recurso: RecursoPerfil): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${recurso}/me/foto`);
  }
}
