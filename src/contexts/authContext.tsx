import React, { createContext, useState } from 'react';
import { AuthContextType } from '../interfaces/types';


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthContextType) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ token, setToken, children }}>
      {children}
    </AuthContext.Provider>
  );
};
