import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { LoginRequest } from './models/login-request';
import { MeResponse } from './models/me-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, credentials);
  }

  loginWithGoogle(credential: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/google`, { credential });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`);
  }
}
