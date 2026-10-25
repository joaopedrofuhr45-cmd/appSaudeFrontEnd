import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { resolverFotoUrl } from '@shared/utils/foto-url';
import { environment } from "@environment/environment";
import { Consulta } from "@features/consulta/models/consulta.model";
import { AlterarSenha, AtualizarPerfil, PerfilMedico } from "@shared/models/perfil-configuracao";
@Injectable({ providedIn: "root" })
export class MedicoService {
 private readonly http=inject(HttpClient); private readonly baseUrl=environment.apiUrl.replace(/\/auth\/?$/, "");
 obterMeuPerfil(): Observable<PerfilMedico> { return this.http.get<PerfilMedico>(this.baseUrl + "/medicos/me").pipe(map(resolverFotoUrl)); }
 atualizarPerfil(perfil: AtualizarPerfil): Observable<PerfilMedico> { return this.http.put<PerfilMedico>(this.baseUrl + "/medicos/me", perfil).pipe(map(resolverFotoUrl)); }
 alterarSenha(dados: AlterarSenha): Observable<void> { return this.http.patch<void>(this.baseUrl + "/medicos/me/senha", dados); }
 listarAgenda(data: string): Observable<Consulta[]> { return this.http.get<Consulta[]>(this.baseUrl + "/medicos/me/consultas", { params: new HttpParams().set("data", data) }); }
}
