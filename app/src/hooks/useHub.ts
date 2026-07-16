import { useState, useEffect } from 'react';
import type { Pack } from '../types/pack';
import type { Plugin } from '../types/plugin';

interface CreatorProfile { name: string; bio?: string; packsCount: number; pluginsCount: number; }
interface Review { id: string; author: string; rating: number; comment: string; }

export const useHub = () => {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPacks([]);
    setPlugins([]);
    setIsLoading(false);
  }, [search]);

  return { packs, plugins, isLoading, error, search, setSearch };
};

export const useHubPack = (packId?: string) => {
  const [pack, setPack] = useState<Pack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setPack(null);
    setIsLoading(false);
  }, [packId]);

  return { pack, isLoading, error };
};

export const useHubPlugin = (pluginId?: string) => {
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setPlugin(null);
    setIsLoading(false);
  }, [pluginId]);

  return { plugin, isLoading, error };
};

export const useHubCreator = (creatorName: string) => {
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProfile(null);
    setIsLoading(false);
  }, [creatorName]);

  return { profile, isLoading };
};

export const useHubReviews = (itemId: string, type: 'pack' | 'plugin') => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setReviews([]);
    setIsLoading(false);
  }, [itemId, type]);

  return { reviews, isLoading };
};
