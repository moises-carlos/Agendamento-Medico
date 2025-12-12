import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginUser({ email, senha: password });
      login(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Login falhou. Verifique suas credenciais.');
    }
  };
  
  const handleGoogleLogin = () => {
    // Redirect to backend Google auth route
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <hr style={{ margin: '1rem 0' }} />
      <button onClick={handleGoogleLogin}>Login com Google</button>
    </div>
  );
};

export default LoginPage;
