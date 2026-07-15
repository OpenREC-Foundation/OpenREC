import { create } from 'zustand';
import type { Pack } from '../services/hub';

interface PacksState {
  installedPacks: Pack[];
  isLoading: boolean;
  error: string | null;

  setInstalledPacks: (packs: Pack[]) => void;
  addPack: (pack: Pack) => void;
  removePack: (packId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePacksStore = create<PacksState>((set) => ({
  installedPacks: [],
  isLoading: false,
  error: null,

  setInstalledPacks: (packs) => set({ installedPacks: packs }),
  addPack: (pack) =>
    set((state) => ({ installedPacks: [...state.installedPacks, pack] })),
  removePack: (packId) =>
    set((state) => ({
      installedPacks: state.installedPacks.filter((p) => p.id !== packId),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
