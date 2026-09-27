export interface MeResponse {
  cpf: string;
  role: 'USUARIO' | 'MEDICO' | 'ATENDENTE';
}