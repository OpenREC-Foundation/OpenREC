import { create } from 'zustand';
import type { Project } from '../types/project';
import type { Track } from '../types/media';

interface AISuggestion { id: string; description: string }

interface EditorState {
  project: Project | null;
  tracks: Track[];
  selectedClipId: string | null;
  currentTime: number;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  showExport: boolean;
  isExporting: boolean;
  aiSuggestions: AISuggestion[];

  setProject: (p: Project | null) => void;
  setTracks: (t: Track[]) => void;
  setSelectedClipId: (id: string | null) => void;
  setCurrentTime: (t: number) => void;
  setPlaying: (p: boolean) => void;
  setLoading: (l: boolean) => void;
  setError: (e: string | null) => void;
  setShowExport: (s: boolean) => void;
  setExporting: (e: boolean) => void;
  setAISuggestions: (s: AISuggestion[]) => void;
  removeAISuggestion: (id: string) => void;
  selectClip: (id: string | null) => void;
  addEffectToClip: (clipId: string, effectId: string) => void;
  updateClipProperty: (clipId: string, prop: string, val: any) => void;
  showExportPanel: () => void;
  hideExport: () => void;
  exportProject: (config: { resolution: string; format: string; aiEnhance: boolean }) => void;
  applyAISuggestion: (id: string) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  project: null, tracks: [], selectedClipId: null, currentTime: 0, isPlaying: false,
  isLoading: false, error: null, showExport: false, isExporting: false, aiSuggestions: [],

  setProject: (p) => set({ project: p }),
  setTracks: (t) => set({ tracks: t }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),
  setCurrentTime: (t) => set({ currentTime: t }),
  setPlaying: (p) => set({ isPlaying: p }),
  setLoading: (l) => set({ isLoading: l }),
  setError: (e) => set({ error: e }),
  setShowExport: (s) => set({ showExport: s }),
  setExporting: (e) => set({ isExporting: e }),
  setAISuggestions: (s) => set({ aiSuggestions: s }),
  removeAISuggestion: (id) => set((s) => ({ aiSuggestions: s.aiSuggestions.filter((x) => x.id !== id) })),
  selectClip: (id) => set({ selectedClipId: id }),
  addEffectToClip: (_clipId, _effectId) => {},
  updateClipProperty: (_clipId, _prop, _val) => {},
  showExportPanel: () => set({ showExport: true }),
  hideExport: () => set({ showExport: false }),
  exportProject: (_config) => {},
  applyAISuggestion: (_id) => {},
  reset: () => set({ project: null, tracks: [], selectedClipId: null, currentTime: 0, isPlaying: false, isLoading: false, error: null, showExport: false, isExporting: false, aiSuggestions: [] }),
}));
