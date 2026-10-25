export interface AtualizarPerfil { nome: string; email: string; telefone: string; }
export interface PerfilPaciente extends AtualizarPerfil { fotoUrl?: string | null; }
export interface PerfilAtendente extends AtualizarPerfil { setor: string; fotoUrl?: string | null; }
export interface PerfilMedico extends AtualizarPerfil { crm: string; especialidade: string; fotoUrl?: string | null; }
/** Sem senha atual: a sessão (cookie JWT) já identifica quem está trocando. */
export interface AlterarSenha { novaSenha: string; }
export interface FotoPerfilResponse { fotoUrl: string | null; }
