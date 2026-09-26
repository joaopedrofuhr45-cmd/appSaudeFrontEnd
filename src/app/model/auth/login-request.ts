export interface LoginRequest {
    cpf: string;
    senha: string;
    tipoUsuario: 'paciente' | 'atendente' | 'medico';
}