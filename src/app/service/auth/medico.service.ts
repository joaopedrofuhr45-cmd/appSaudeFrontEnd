import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";
import { AtualizarPerfil, PerfilMedico } from "../../model/auth/perfil-configuracao";
@Injectable({ providedIn: "root" })
export class MedicoService {
 private readonly http=inject(HttpClient); private readonly baseUrl=environment.apiUrl.replace(/\/auth\/?$/, "");
 obterMeuPerfil(): Observable<PerfilMedico> { return this.http.get<PerfilMedico>(this.baseUrl + "/medicos/me", {withCredentials:true}); }
 atualizarPerfil(perfil: AtualizarPerfil): Observable<PerfilMedico> { return this.http.put<PerfilMedico>(this.baseUrl + "/medicos/me", perfil, {withCredentials:true}); }
}