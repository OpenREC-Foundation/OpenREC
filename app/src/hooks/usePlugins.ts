import { useState, useEffect } from 'react';
import type { Plugin } from '../types/plugin';
import { hubService } from '../services/hub';

export const usePlugins = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlugins = async () => {
      try {
        setIsLoading(true);
        // const response = await hubService.getActivePlugins();
        // setPlugins(response.data);
        setPlugins([]);
      } catch (err) {
        setError('Falha ao carregar plugins');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlugins();
  }, []);

  return { plugins, isLoading, error };
};
