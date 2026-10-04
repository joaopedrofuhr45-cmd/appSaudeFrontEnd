export interface Consulta {
  horario: string;
  nomePaciente: string;
  detalhe: string;
  status: 'AGENDADO' | 'CONFIRMADO' | 'EM_ESPERA' | 'CANCELADO' | 'CONCLUIDO';
  dataHora: string;
}