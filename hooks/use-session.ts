"use client";

import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://www.server.waynexshipping.com";

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
    const init = async () => {
      // Try loading session from localStorage
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        try {
          setSessionState(JSON.parse(storedSession));
          setIsLoading(false);
          return;
        } catch (e) {
          console.error('Failed to parse session:', e);
        }
      }

      // No session — try remember token
      const rememberToken = localStorage.getItem('rememberToken');
      if (rememberToken) {
        try {
          const response = await fetch(`${API_URL}/api/auth/verify-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: rememberToken }),
          });

          if (response.ok) {
            const data = await response.json();
            const user = data.user;
            setSessionState(user);
            localStorage.setItem('session', JSON.stringify(user));
            localStorage.setItem('userEmail', user.email);
          } else {
            // Token invalid or expired — clear it
            localStorage.removeItem('rememberToken');
          }
        } catch (e) {
          console.error('Failed to verify remember token:', e);
        }
      }

      setIsLoading(false);
    };

    init();
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
    localStorage.removeItem('userEmail');
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
