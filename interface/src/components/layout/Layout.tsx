import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

const Layout = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      login(token);
      // Clean up the URL
      navigate('/', { replace: true });
    }
  }, [location, login, navigate]);

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#eee' }}>
        <div>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          {user && (
            <>
              <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
              <Link to="/my-contracts">Meus Contratos</Link>
            </>
          )}
        </div>
        <div>
          {!user ? (
            <>
              <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span style={{ marginRight: '1rem' }}>Ola, {user.tipo}!</span>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
