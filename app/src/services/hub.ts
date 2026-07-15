interface Pack {
  id: string;
  name: string;
  icon: string;
  author: string;
  rating: number;
  downloads: number;
  version: string;
  description?: string;
  tags?: string[];
}

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  rating: number;
  downloads: number;
  enabled: boolean;
  permissions?: string[];
}

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

const HUB_API_URL = 'https://api.openrec.org/v1';

const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${HUB_API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Hub API error: ${response.statusText}`);
  }
  return response.json();
};

const hubService = {
  getPacks: async (search?: string): Promise<Pack[]> => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiRequest<Pack[]>(`/packs${query}`);
  },

  getPack: async (packId: string): Promise<Pack> => {
    return apiRequest<Pack>(`/packs/${packId}`);
  },

  getPlugins: async (search?: string): Promise<Plugin[]> => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return apiRequest<Plugin[]>(`/plugins${query}`);
  },

  getPlugin: async (pluginId: string): Promise<Plugin> => {
    return apiRequest<Plugin>(`/plugins/${pluginId}`);
  },

  getCreator: async (creatorName: string): Promise<CreatorProfile> => {
    return apiRequest<CreatorProfile>(`/creators/${creatorName}`);
  },

  getReviews: async (itemId: string, type: 'pack' | 'plugin'): Promise<Review[]> => {
    return apiRequest<Review[]>(`/reviews/${type}/${itemId}`);
  },

  getInstalledPacks: async (): Promise<Pack[]> => {
    return apiRequest<Pack[]>('/me/packs');
  },

  getActivePlugins: async (): Promise<Plugin[]> => {
    return apiRequest<Plugin[]>('/me/plugins');
  },
};

export { hubService };
export type { Pack, Plugin, CreatorProfile, Review };
