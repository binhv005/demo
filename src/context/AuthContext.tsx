import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('demo_admin_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name) {
          parsed.name = parsed.name.replace(/\s*\(Demo\)/gi, '').trim();
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === 'admin@example.com' && pass === '123456') {
      const demoUser = {
        email: 'admin@example.com',
        name: 'Quản Trị Viên',
        role: 'Senior Editorial Admin'
      };
      setUser(demoUser);
      localStorage.setItem('demo_admin_user', JSON.stringify(demoUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('demo_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
