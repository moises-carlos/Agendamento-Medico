import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipo, setTipo] = useState<'freelancer' | 'empresa'>('freelancer');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerUser({ nome: name, email, senha: password, tipo });
      navigate('/login');
    } catch (err) {
      setError('Registro falhou. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
          <option value="freelancer">Sou Freelancer</option>
          <option value="empresa">Sou Empresa</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
