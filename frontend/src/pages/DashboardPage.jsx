import React from 'react';
import { useAuth } from '../context/AuthContext';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import TrainerDashboard from '../components/dashboards/TrainerDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center p-10">Loading user data...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }


    switch (user.role) {
        case 'ROLE_CLIENT':
            return <ClientDashboard />;
        case 'ROLE_TRAINER':
            return <TrainerDashboard />;
        case 'ROLE_ADMIN':
            return <AdminDashboard />;
        default:
           
            return <Navigate to="/" />;
    }
};

export default DashboardPage;

