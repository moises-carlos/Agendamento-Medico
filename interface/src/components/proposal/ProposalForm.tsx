import React, { useState } from 'react';

interface ProposalFormProps {
  onProposalSubmit: (valor: number, descricao: string) => void;
  error: string | null;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ onProposalSubmit, error }) => {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProposalSubmit(parseFloat(valor), descricao);
    setValor("");
    setDescricao("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h4>Enviar sua Proposta</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <textarea
        placeholder="Descreva sua proposta"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
        minLength={20}
      />
      <input
        type="number"
        placeholder="Seu orcamento"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        required
      />
      <button type="submit">Enviar Proposta</button>
    </form>
  );
};

export default ProposalForm;
