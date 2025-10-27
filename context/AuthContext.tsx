import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin credentials
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'admin';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email: string, pass: string): boolean => {
    // Em uma aplicação real, aqui você faria uma chamada de API para o backend
    if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Em uma aplicação real, você armazenaria o token (JWT)
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Em uma aplicação real, você removeria o token
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};