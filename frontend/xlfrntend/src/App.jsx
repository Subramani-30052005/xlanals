import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UploadPage from './pages/UploadPage';
import ChartAnalysisPage from './pages/ChartAnalysisPage';
import UserDashboard from './pages/UserDashboard';

export default function App() {
  const { token } = useSelector((state) => state.auth);

  const PrivateRoute = ({ children }) =>
    token ? children : <Navigate to="/login" />;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
          <Route path="/analysis" element={<PrivateRoute><ChartAnalysisPage /></PrivateRoute>} />
          <Route path="/dashboard" element={token ? <UserDashboard /> : <Navigate to="/login" />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}
