export type StatusConsulta =
  | 'AGENDADO'
  | 'CONFIRMADO'
  | 'EM_ESPERA'
  | 'CANCELADO'
  | 'CONCLUIDO';

export interface Consulta {
  id?: number;
  dataHora: string;
  horario: string;
  nomePaciente: string;
  detalhe: string;
  status: StatusConsulta;
}

export interface ConsultaPaciente {
  id: number | string;
  dataHora: string;
  medico: string;
  especialidade: string;
  status: StatusConsulta;
  unidade?: string;
  modalidade?: string;
}

export interface HistoricoConsulta {
  id: number | string;
  titulo: string;
  detalhe: string;
  descricao: string;
  dataHora: string;
}

export interface ConsultaAgendamento {
  pacienteId?: number;
  medicoId: number;
  tipoConsulta: string;
  dataHora: string;
  observacao?: string;
}

export interface MedicoOpcao {
  id: number | string;
  nome: string;
}
