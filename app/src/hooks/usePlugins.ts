import { useState, useEffect } from 'react';
import type { Plugin } from '../types/plugin';

export const usePlugins = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setPlugins([]);
    setIsLoading(false);
  }, []);

  return { plugins, isLoading, error };
};
