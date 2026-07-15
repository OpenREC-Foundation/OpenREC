import { useState, useEffect } from 'react';
import { storageService } from '../services/storage';

export const useStorage = () => {
  const [used, setUsed] = useState(0);
  const [total, setTotal] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        setIsLoading(true);
        // const status = await storageService.getStorageStatus();
        // setUsed(status.used);
        // setTotal(status.total);
        setUsed(0);
        setTotal(100);
      } catch (err) {
        // valores padrão
      } finally {
        setIsLoading(false);
      }
    };
    fetchStorage();
  }, []);

  const cleanupTemp = async () => {
    await storageService.cleanupTemp();
  };

  return { used, total, isLoading, cleanupTemp };
};
