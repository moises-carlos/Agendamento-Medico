import { useState, useEffect } from 'react';
import { getMyContracts, createReview } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Modal from '../components/common/Modal';
import ReviewForm from '../components/review/ReviewForm';
import { Contract } from '../types';

const MyContractsPage = () => {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const res = await getMyContracts();
        setContracts(res.data);
      } catch (err) {
        setError('Falha ao carregar contratos.');
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, []);

  const handleOpenReviewModal = (contract: Contract) => {
    setSelectedContract(contract);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedContract(null);
    setShowReviewModal(false);
    setReviewError(null);
  };

  const handleReviewSubmit = async (rating: number, comment: string) => {
    setReviewError(null);
    if (!selectedContract) return;

    const revieweeId = user?.id === selectedContract.empresa_id ? selectedContract.freelancer_id : selectedContract.empresa_id;

    try {
      await createReview({
        project_id: selectedContract.project_id,
        reviewee_id: revieweeId,
        rating,
        comment,
      });
      handleCloseReviewModal();
    } catch (err) {
      setReviewError('Falha ao enviar avaliacao.');
    }
  };


  if (loading) return <p>Carregando contratos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Meus Contratos</h2>
      {contracts.length > 0 ? (
        <ul>
          {contracts.map(c => (
            <li key={c.id}>
              <p>Projeto ID: {c.project_id}</p>
              <p>Status: {c.status}</p>
              {c.status === 'finalizado' && (
                <button onClick={() => handleOpenReviewModal(c)}>Deixar Avaliacao</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Voce nao tem contratos.</p>
      )}

      {showReviewModal && selectedContract && (
        <Modal onClose={handleCloseReviewModal}>
          <ReviewForm onSubmit={handleReviewSubmit} error={reviewError} />
        </Modal>
      )}
    </div>
  );
};

export default MyContractsPage;
