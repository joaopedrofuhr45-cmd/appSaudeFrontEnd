import { environment } from '@environment/environment';

const API_BASE = environment.apiUrl.replace(/\/auth\/?$/, '');

/** O back devolve o fotoUrl relativo (ex.: /pacientes/me/foto?v=123); aqui vira a URL completa da API. */
export function resolverFotoUrl<T extends { fotoUrl?: string | null }>(perfil: T): T {
  const url = perfil.fotoUrl;
  if (!url || /^(https?:|blob:|data:)/.test(url)) return perfil;
  return { ...perfil, fotoUrl: API_BASE + url };
}
