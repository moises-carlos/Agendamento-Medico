import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProjects } from '../../services/api';
import { Project } from '../../types';

const CompanyDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        setLoading(true);
        const response = await getMyProjects();
        setProjects(response.data);
      } catch (err) {
        setError('Falha ao carregar seus projetos.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyProjects();
  }, []);


  if (loading) return <p>Carregando projetos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Dashboard da Empresa</h3>
      <Link to="/create-project">
        <button>Criar Novo Projeto</button>
      </Link>
      <h4 style={{marginTop: '2rem'}}>Seus Projetos Publicados</h4>
      {projects.length > 0 ? (
        <ul>
          {projects.map(p => (
            <li key={p.id}>
              <Link to={`/projects/${p.id}`}>{p.titulo}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Voce ainda nao publicou nenhum projeto.</p>
      )}
    </div>
  );
};

export default CompanyDashboard;
