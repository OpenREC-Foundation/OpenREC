import { useState, useEffect } from 'react';
import type { Pack } from '../types/pack';
import { hubService } from '../services/hub';

export const usePacks = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        setIsLoading(true);
        // const response = await hubService.getInstalledPacks();
        // setPacks(response.data);
        setPacks([]);
      } catch (err) {
        setError('Falha ao carregar packs instalados');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPacks();
  }, []);

  return { packs, isLoading, error };
};
