export interface User {
    id: number;
    nome: string;
    email: string;
    tipo: 'admin' | 'empresa' | 'freelancer';
}

export interface Project {
    id: number;
    titulo: string;
    descricao: string;
    orcamento: number;
    empresa_id: number;
    status: 'aberto' | 'em andamento' | 'finalizado' | 'cancelado';
    criado_em: string;
    atualizado_em: string;
}

export interface Proposal {
    id: number;
    valor: number;
    descricao: string;
    freelancer_id: number;
    project_id: number;
    status: 'pendente' | 'aceita' | 'recusada';
    freelancer_nome?: string;
    project_titulo?: string;
}

export interface Contract {
    id: number;
    terms: string;
    valor: number;
    status: 'ativo' | 'finalizado' | 'quebrado';
    project_id: number;
    freelancer_id: number;
    empresa_id: number;
}

export interface Review {
    id: number;
    rating: number;
    comment: string;
    reviewer_id: number;
    reviewee_id: number;
    project_id: number;
}

export interface Message {
    id: number;
    conteudo: string;
    sender_id: number;
    project_id: number;
    criado_em: string;
    attachments?: any[];
}
