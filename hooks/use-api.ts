"use client";

import { useState, useEffect } from 'react';
import { useSession } from './use-session';

export function useApi<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { session } = useSession();

  useEffect(() => {
    if (!endpoint) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (session?.email) {
          headers['X-User-Email'] = session.email;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.server.waynexshipping.com';
        const url = endpoint.startsWith('http') ? endpoint : `${apiUrl}${endpoint}`;

        const response = await fetch(url, { headers });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, session?.email]);

  return { data, isLoading, error };
}
