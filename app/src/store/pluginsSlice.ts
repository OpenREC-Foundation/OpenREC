import { create } from 'zustand';
import type { Plugin } from '../services/hub';

interface PluginsState {
  activePlugins: Plugin[];
  isLoading: boolean;
  error: string | null;

  setActivePlugins: (plugins: Plugin[]) => void;
  addPlugin: (plugin: Plugin) => void;
  removePlugin: (pluginId: string) => void;
  togglePluginEnabled: (pluginId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePluginsStore = create<PluginsState>((set) => ({
  activePlugins: [],
  isLoading: false,
  error: null,

  setActivePlugins: (plugins) => set({ activePlugins: plugins }),
  addPlugin: (plugin) =>
    set((state) => ({ activePlugins: [...state.activePlugins, plugin] })),
  removePlugin: (pluginId) =>
    set((state) => ({
      activePlugins: state.activePlugins.filter((p) => p.id !== pluginId),
    })),
  togglePluginEnabled: (pluginId) =>
    set((state) => ({
      activePlugins: state.activePlugins.map((p) =>
        p.id === pluginId ? { ...p, enabled: !p.enabled } : p
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
