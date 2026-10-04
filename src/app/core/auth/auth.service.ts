import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { LoginRequest } from '../../features/auth/models/login-request';
import { MeResponse } from '../../features/auth/models/me-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  loginWithGoogle(credential: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/google`, { credential }, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`, { withCredentials: true });
  }
}
