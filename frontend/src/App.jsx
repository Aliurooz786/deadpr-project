import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrainersPage from './pages/TrainersPage';
import DashboardPage from './pages/DashboardPage';
import TrainerDetailPage from './pages/TrainerDetailPage'; // Naye page ko import karein

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="trainers" element={<TrainersPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="trainer/:trainerId" element={<TrainerDetailPage />} />

      </Route>
    </Routes>
  );
}

export default App;

