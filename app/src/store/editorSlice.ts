import { create } from 'zustand';
import type { Project, Track } from '../services/engine';

interface AISuggestion {
  id: string;
  description: string;
}

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

  setProject: (project: Project | null) => void;
  setTracks: (tracks: Track[]) => void;
  setSelectedClipId: (clipId: string | null) => void;
  setCurrentTime: (time: number) => void;
  setPlaying: (playing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowExport: (show: boolean) => void;
  setExporting: (exporting: boolean) => void;
  setAISuggestions: (suggestions: AISuggestion[]) => void;
  removeAISuggestion: (id: string) => void;

  selectClip: (clipId: string | null) => void;
  addEffectToClip: (clipId: string, effectId: string) => void;
  updateClipProperty: (clipId: string, property: string, value: any) => void;
  showExportPanel: () => void;
  hideExportPanel: () => void;
  applyAISuggestion: (suggestionId: string) => void;
  reset: () => void;
}

const initialState = {
  project: null,
  tracks: [],
  selectedClipId: null,
  currentTime: 0,
  isPlaying: false,
  isLoading: false,
  error: null,
  showExport: false,
  isExporting: false,
  aiSuggestions: [],
};

export const useEditorStore = create<EditorState>((set) => ({
  ...initialState,

  setProject: (project) => set({ project }),
  setTracks: (tracks) => set({ tracks }),
  setSelectedClipId: (clipId) => set({ selectedClipId: clipId }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setShowExport: (show) => set({ showExport: show }),
  setExporting: (exporting) => set({ isExporting: exporting }),
  setAISuggestions: (suggestions) => set({ aiSuggestions: suggestions }),
  removeAISuggestion: (id) =>
    set((state) => ({
      aiSuggestions: state.aiSuggestions.filter((s) => s.id !== id),
    })),

  selectClip: (clipId) => set({ selectedClipId: clipId }),
  addEffectToClip: (_clipId, _effectId) => {},
  updateClipProperty: (_clipId, _property, _value) => {},
  showExportPanel: () => set({ showExport: true }),
  hideExportPanel: () => set({ showExport: false }),
  applyAISuggestion: (_suggestionId) => {},
  reset: () => set(initialState),
}));
