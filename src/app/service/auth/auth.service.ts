import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../model/login/login-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(loginCredentials: LoginRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, loginCredentials, {
      withCredentials: true,
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true },
    );
  }

  me(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/me`, { withCredentials: true });
  }
}
