import { useAuth } from '../hooks/useAuth';
import FreelancerDashboard from '../components/dashboard/FreelancerDashboard';
import CompanyDashboard from '../components/dashboard/CompanyDashboard';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Seu Dashboard</h2>
      {user?.tipo === 'freelancer' && <FreelancerDashboard />}
      {user?.tipo === 'empresa' && <CompanyDashboard />}
    </div>
  );
};

export default DashboardPage;
