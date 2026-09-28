export interface AtualizarPerfil { nome: string; email: string; telefone: string; }
export interface PerfilPaciente extends AtualizarPerfil {}
export interface PerfilAtendente extends AtualizarPerfil { setor: string; }
export interface PerfilMedico extends AtualizarPerfil { crm: string; especialidade: string; }
export interface AlterarSenha { senhaAtual: string; novaSenha: string; }