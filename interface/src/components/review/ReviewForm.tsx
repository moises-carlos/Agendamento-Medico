import React, { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  error: string | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, error }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Deixar uma Avaliacao</h4>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <label>Nota (1-5)</label>
      <input type="number" min="1" max="5" value={rating} onChange={e => setRating(parseInt(e.target.value))} required />
      <label>Comentario</label>
      <textarea value={comment} onChange={e => setComment(e.target.value)} required />
      <button type="submit">Enviar Avaliacao</button>
    </form>
  );
};

export default ReviewForm;
