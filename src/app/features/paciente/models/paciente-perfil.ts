export interface PacientePerfil {
  nome: string;
  email: string;
  telefone: string;
  fotoUrl?: string | null;
}

export interface AlterarSenhaPaciente {
  novaSenha: string;
}
