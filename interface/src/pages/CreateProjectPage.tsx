import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const CreateProjectPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Redirect if user is not a company
  if (user?.tipo !== 'empresa') {
    navigate('/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const newProject = await createProject({ titulo, descricao, orcamento: parseFloat(orcamento) });
      navigate(`/projects/${newProject.data.id}`);
    } catch (err) {
      setError('Falha ao criar o projeto. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Criar Novo Projeto</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Titulo do Projeto</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div style={{marginTop: '1rem'}}>
          <label htmlFor="descricao">Descricao do Projeto</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            minLength={20}
          />
          <small>A descricao deve ter no minimo 20 caracteres.</small>
        </div>
        <div style={{marginTop: '1rem'}}>
          <label htmlFor="orcamento">Orcamento (R$)</label>
          <input
            id="orcamento"
            type="number"
            value={orcamento}
            onChange={(e) => setOrcamento(e.target.value)}
            required
          />
        </div>
        <button style={{marginTop: '1rem'}} type="submit">Criar Projeto</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
