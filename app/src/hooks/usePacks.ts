import { useState, useEffect } from 'react';
import type { Pack } from '../types/pack';

export const usePacks = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setPacks([]);
    setIsLoading(false);
  }, []);

  return { packs, isLoading, error };
};
