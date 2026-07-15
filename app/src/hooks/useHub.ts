import { useState, useEffect, useCallback } from 'react';
import type { Pack } from '../types/pack';
import type { Plugin } from '../types/plugin';
import { hubService } from '../services/hub';

interface CreatorProfile {
  name: string;
  bio?: string;
  packsCount: number;
  pluginsCount: number;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export const useHub = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      // const [packsRes, pluginsRes] = await Promise.all([
      //   hubService.getPacks(search),
      //   hubService.getPlugins(search),
      // ]);
      // setPacks(packsRes.data);
      // setPlugins(pluginsRes.data);
      setPacks([]);
      setPlugins([]);
    } catch (err) {
      setError('Falha ao conectar com o OpenREC Hub');
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { packs, plugins, isLoading, error, search, setSearch };
};

export const useHubPack = (packId?: string) => {
  const [pack, setPack] = useState<Pack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!packId) return;
    const fetchPack = async () => {
      try {
        setIsLoading(true);
        // const res = await hubService.getPack(packId);
        // setPack(res.data);
        setPack(null);
      } catch (err) {
        setError('Pack não encontrado');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPack();
  }, [packId]);

  return { pack, isLoading, error };
};

export const useHubPlugin = (pluginId?: string) => {
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pluginId) return;
    const fetchPlugin = async () => {
      try {
        setIsLoading(true);
        // const res = await hubService.getPlugin(pluginId);
        // setPlugin(res.data);
        setPlugin(null);
      } catch (err) {
        setError('Plugin não encontrado');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlugin();
  }, [pluginId]);

  return { plugin, isLoading, error };
};

export const useHubCreator = (creatorName: string) => {
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        // const res = await hubService.getCreator(creatorName);
        // setProfile(res.data);
        setProfile(null);
      } catch (err) {
        setProfile(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [creatorName]);

  return { profile, isLoading };
};

export const useHubReviews = (itemId: string, type: 'pack' | 'plugin') => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        // const res = await hubService.getReviews(itemId, type);
        // setReviews(res.data);
        setReviews([]);
      } catch (err) {
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [itemId, type]);

  return { reviews, isLoading };
};
