export type StatusConsultaPaciente =
  | 'AGENDADO'
  | 'CONFIRMADO'
  | 'EM_ESPERA'
  | 'CANCELADO'
  | 'CONCLUIDO';

export interface PacienteConsulta {
  id: number | string;
  dataHora: string;
  medico: string;
  especialidade: string;
  status: StatusConsultaPaciente;
  unidade?: string;
  modalidade?: string;
}

export interface SolicitarConsulta {
  especialidade: string;
  medico: string;
  data: string;
  horario: string;
  observacao?: string;
}

export interface OpcaoMedico {
  id: number | string;
  nome: string;
}

export interface RegistroHistoricoPaciente {
  id: number | string;
  titulo: string;
  detalhe: string;
  descricao: string;
  dataHora: string;
}
