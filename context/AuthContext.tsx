
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { verifyPassword, hashString, DEFAULT_HASH } from '../utils/auth.ts';
import { storageService } from '../services/StorageService.ts';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (current: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentHash, setCurrentHash] = useState(DEFAULT_HASH);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Load persisted hash if available
    const state = storageService.load();
    if (state && state.adminPasswordHash) {
      setCurrentHash(state.adminPasswordHash);
    }

    // 2. Check for existing session
    const session = sessionStorage.getItem('wn_auth_session');
    if (session === 'valid') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    const isValid = await verifyPassword(password, currentHash);
    if (isValid) {
      setIsAuthenticated(true);
      sessionStorage.setItem('wn_auth_session', 'valid');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('wn_auth_session');
  };

  const changePassword = async (current: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    // Verify current password first
    const isCurrentValid = await verifyPassword(current, currentHash);
    if (!isCurrentValid) {
      return { success: false, message: "Current password is incorrect." };
    }

    try {
      const newHash = await hashString(newPass);
      setCurrentHash(newHash);
      
      // Persist to storage
      const currentState = storageService.load() || { 
        cities: {}, staged: {}, global: {} as any, backups: [], logs: [] 
      };
      
      storageService.save({
        ...currentState,
        adminPasswordHash: newHash
      });

      return { success: true, message: "Password updated successfully." };
    } catch (e) {
      return { success: false, message: "Failed to generate password hash." };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
