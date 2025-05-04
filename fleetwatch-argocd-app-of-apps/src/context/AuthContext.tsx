import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { users, defaultCredentials } from '../data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in (using localStorage in this demo)
    const storedUser = localStorage.getItem('fleetwatch_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    // Simulate API call with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === defaultCredentials.email && password === defaultCredentials.password) {
          const loggedInUser = users.find(u => u.email === email) || null;
          setUser(loggedInUser);
          localStorage.setItem('fleetwatch_user', JSON.stringify(loggedInUser));
          setIsLoading(false);
          resolve(true);
        } else {
          setError('Credenciais inválidas. Tente novamente.');
          setIsLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fleetwatch_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};