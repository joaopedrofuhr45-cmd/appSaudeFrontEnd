import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@environment/environment";
import { AlterarSenha, AtualizarPerfil, PerfilMedico } from "@shared/models/perfil-configuracao";
@Injectable({ providedIn: "root" })
export class MedicoService {
 private readonly http=inject(HttpClient); private readonly baseUrl=environment.apiUrl.replace(/\/auth\/?$/, "");
 obterMeuPerfil(): Observable<PerfilMedico> { return this.http.get<PerfilMedico>(this.baseUrl + "/medicos/me", {withCredentials:true}); }
 atualizarPerfil(perfil: AtualizarPerfil): Observable<PerfilMedico> { return this.http.put<PerfilMedico>(this.baseUrl + "/medicos/me", perfil, {withCredentials:true}); }
 alterarSenha(dados: AlterarSenha): Observable<void> { return this.http.patch<void>(this.baseUrl + "/medicos/me/senha", dados, {withCredentials:true}); }
}
