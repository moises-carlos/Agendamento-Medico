import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { getProjects } from '../services/api';
import { Project } from '../types';

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (err) {
        setError('Nao foi possivel carregar os projetos.');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>Todos os Projetos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {projects.length > 0 ? (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{project.titulo}</h3>
                <p>{project.descricao}</p>
                <span>Orccamento: R${project.orcamento}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum projeto encontrado.</p>
      )}
    </div>
  );
};

export default HomePage;
