import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';

/**
 * Carrega a foto pelo HttpClient (que já manda o cookie de sessão) e devolve uma URL local (blob:).
 * Um <img src="https://api..."> direto depende de cookie de terceiros e some em vários navegadores.
 */
@Injectable({ providedIn: 'root' })
export class FotoBlobService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, string>();

  carregar(url: string): Observable<string> {
    if (url.startsWith('blob:') || url.startsWith('data:')) return of(url);
    const guardada = this.cache.get(url);
    if (guardada) return of(guardada);
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob) => {
        const local = URL.createObjectURL(blob);
        this.cache.set(url, local);
        return local;
      })
    );
  }
}
