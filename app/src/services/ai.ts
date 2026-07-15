interface AISuggestion {
  id: string;
  description: string;
  type: 'cut' | 'effect' | 'transition' | 'text';
  timestamp: number;
  confidence: number;
}

const aiService = {
  analyzeProject: async (
    projectId: string,
    onProgress: (progress: number) => void
  ): Promise<AISuggestion[]> => {
    throw new Error('IA não disponível no momento');
  },

  applySuggestion: async (suggestionId: string): Promise<void> => {
    throw new Error('IA não disponível no momento');
  },

  superResolution: async (clipId: string, targetResolution: string): Promise<void> => {
    throw new Error('Super resolução não disponível no momento');
  },

  enhanceBitrate: async (clipId: string): Promise<void> => {
    throw new Error('Melhoria de bitrate não disponível no momento');
  },

  enhanceAudio: async (clipId: string): Promise<void> => {
    throw new Error('Melhoria de áudio não disponível no momento');
  },
};

export { aiService };
export type { AISuggestion };
