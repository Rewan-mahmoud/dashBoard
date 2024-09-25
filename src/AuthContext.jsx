import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');

  const login = (newToken) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authToken', newToken); // Save the token
    setToken(newToken);
  };
  const logout = async () => {
    try {
      const response = await fetch('https://naql.nozzm.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'lang': 'en',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('authToken'); // Remove the token
      setIsAuthenticated(false);
      setToken('');
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
