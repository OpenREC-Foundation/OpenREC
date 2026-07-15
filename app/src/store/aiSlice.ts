import { create } from 'zustand';

type AIStatus = 'idle' | 'analyzing' | 'processing' | 'processing_audio' | 'upscaling' | 'error';

interface AISuggestion {
  id: string;
  description: string;
}

interface AIState {
  status: AIStatus;
  progress: number;
  suggestions: AISuggestion[];
  error: string | null;

  setStatus: (status: AIStatus) => void;
  setProgress: (progress: number) => void;
  setSuggestions: (suggestions: AISuggestion[]) => void;
  removeSuggestion: (id: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  status: 'idle' as AIStatus,
  progress: 0,
  suggestions: [],
  error: null,
};

export const useAIStore = create<AIState>((set) => ({
  ...initialState,

  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  setSuggestions: (suggestions) => set({ suggestions }),
  removeSuggestion: (id) =>
    set((state) => ({
      suggestions: state.suggestions.filter((s) => s.id !== id),
    })),
  setError: (error) => set({ error, status: 'error' }),
  reset: () => set(initialState),
}));
