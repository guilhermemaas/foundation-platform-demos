import React, { useState } from 'react';
import { Truck, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@fleetwatch.com');
  const [password, setPassword] = useState('admin123');
  const { login, error, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Header with logo */}
          <div className="p-8 bg-slate-700 flex flex-col items-center">
            <div className="bg-blue-600 rounded-full p-3 shadow-lg mb-4">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">FleetWatch</h1>
            <p className="text-slate-300 mt-2 text-center">Sistema de monitoramento de veículos</p>
          </div>

          {/* Login form */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-500">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border-slate-600 text-slate-300 bg-slate-700 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      placeholder="admin@fleetwatch.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">Senha</label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-500" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border-slate-600 text-slate-300 bg-slate-700 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                      placeholder="admin123"
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Entrar'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">
                Use as credenciais padrão:
                <br />
                <span className="font-semibold">Email: admin@fleetwatch.com</span>
                <br />
                <span className="font-semibold">Senha: admin123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;