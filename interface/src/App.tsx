import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import MyContractsPage from './pages/MyContractsPage';
import CreateProjectPage from './pages/CreateProjectPage'; // Import the new page
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="my-contracts" element={<MyContractsPage />} />
          <Route path="create-project" element={<CreateProjectPage />} /> {/* Add create project route */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;