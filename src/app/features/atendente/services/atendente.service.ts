import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { resolverFotoUrl } from '@shared/utils/foto-url';
import { environment } from "@environment/environment";
import { AlterarSenha, AtualizarPerfil, PerfilAtendente } from "@shared/models/perfil-configuracao";
@Injectable({ providedIn: "root" })
export class AtendenteService {
 private readonly http=inject(HttpClient); private readonly baseUrl=environment.apiUrl.replace(/\/auth\/?$/, "");
 obterMeuPerfil(): Observable<PerfilAtendente> { return this.http.get<PerfilAtendente>(this.baseUrl + "/atendentes/me").pipe(map(resolverFotoUrl)); }
 atualizarPerfil(perfil: AtualizarPerfil): Observable<PerfilAtendente> { return this.http.put<PerfilAtendente>(this.baseUrl + "/atendentes/me", perfil).pipe(map(resolverFotoUrl)); }
 alterarSenha(dados: AlterarSenha): Observable<void> { return this.http.patch<void>(this.baseUrl + "/atendentes/me/senha", dados); }
}
