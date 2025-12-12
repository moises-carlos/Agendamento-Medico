import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProposalsByFreelancerId } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Proposal } from '../../types';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchMyProposals = async () => {
      try {
        setLoading(true);
        const response = await getProposalsByFreelancerId(user.id.toString());
        setProposals(response.data);
      } catch (err) {
        setError('Falha ao carregar suas propostas.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyProposals();
  }, [user]);

  if (loading) return <p>Carregando propostas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Dashboard do Freelancer</h3>
      <h4>Suas Propostas Enviadas</h4>
      {proposals.length > 0 ? (
        <ul>
          {proposals.map(p => (
            <li key={p.id}>
              <span>Projeto: </span>
              <Link to={`/projects/${p.project_id}`}>{p.project_titulo || 'Ver Projeto'}</Link>
              <p>Status: {p.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Voce ainda nao enviou nenhuma proposta.</p>
      )}
    </div>
  );
};

export default FreelancerDashboard;
