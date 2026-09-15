import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroRequest } from '../../model/cadastro/cadastro-request';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'http://localhost:8080/api';


  cadastro(cadastroCredentials: CadastroRequest){
    return this.http.post<void>(`${this.apiUrl}/cadastro`,cadastroCredentials, {
      withCredentials: true,
    });
  }

}
