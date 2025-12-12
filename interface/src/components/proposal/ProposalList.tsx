import React from 'react';

interface Proposal {
  id: number;
  descricao: string;
  valor: number;
  status: string;
}

interface ProposalListProps {
  proposals: Proposal[];
  onAcceptProposal: (proposalId: string) => void;
}

const ProposalList: React.FC<ProposalListProps> = ({ proposals, onAcceptProposal }) => {
  return (
    <div>
      {proposals.length > 0 ? (
        <ul>
          {proposals.map((p) => (
            <li key={p.id}>
              <p>{p.descricao}</p>
              <p>
                <b>Valor:</b> R${p.valor}
              </p>
              <p>
                <b>Status:</b> {p.status}
              </p>
              {p.status === "pendente" && (
                <button onClick={() => onAcceptProposal(p.id.toString())}>
                  Aceitar
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma proposta recebida ainda.</p>
      )}
    </div>
  );
};

export default ProposalList;
