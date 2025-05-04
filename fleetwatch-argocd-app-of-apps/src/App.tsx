import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-300">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;