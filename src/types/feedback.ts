// types/feedback.ts
export interface Feedback {
  id: number;
  tipo: string;
  emailUsuario: string;
  descricao: string;
  passosReproducao?: string;
  navegador?: string;
  sistemaOperacional?: string;
  prioridade?: 'baixa' | 'média' | 'alta';
  status?: 'pendente' | 'em progresso' | 'corrigido';
  dataCriacao: string;
  anexos?: Anexo[];
}

export interface Anexo {
  id: number;
  url: string;
}