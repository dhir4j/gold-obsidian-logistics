"use client";

import { useState, useEffect } from 'react';

export interface Session {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  isAdmin: boolean;
  isEmployee: boolean;
}

export function useSession() {
  const [session, setSessionState] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load session from localStorage on mount
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      try {
        setSessionState(JSON.parse(storedSession));
      } catch (e) {
        console.error('Failed to parse session:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const setSession = (newSession: Session | null) => {
    setSessionState(newSession);
    if (newSession) {
      localStorage.setItem('session', JSON.stringify(newSession));
    } else {
      localStorage.removeItem('session');
    }
  };

  const clearSession = () => {
    setSessionState(null);
    localStorage.removeItem('session');
    localStorage.removeItem('rememberToken');
  };

  const setRememberToken = (token: string) => {
    localStorage.setItem('rememberToken', token);
  };

  return {
    session,
    setSession,
    clearSession,
    setRememberToken,
    isLoading,
  };
}
