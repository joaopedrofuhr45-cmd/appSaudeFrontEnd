import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";
import { AtualizarPerfil, PerfilAtendente } from "../../model/auth/perfil-configuracao";
@Injectable({ providedIn: "root" })
export class AtendenteService {
 private readonly http=inject(HttpClient); private readonly baseUrl=environment.apiUrl.replace(/\/auth\/?$/, "");
 obterMeuPerfil(): Observable<PerfilAtendente> { return this.http.get<PerfilAtendente>(this.baseUrl + "/atendentes/me", {withCredentials:true}); }
 atualizarPerfil(perfil: AtualizarPerfil): Observable<PerfilAtendente> { return this.http.put<PerfilAtendente>(this.baseUrl + "/atendentes/me", perfil, {withCredentials:true}); }
}