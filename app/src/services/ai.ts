export const aiService = {
  analyzeProject: async (_projectId: string, _onProgress: (p:number)=>void): Promise<any[]> => [],
  applySuggestion: async (_suggestionId: string) => {},
  superResolution: async (_clipId: string, _targetResolution: string) => {},
  enhanceBitrate: async (_clipId: string) => {},
  enhanceAudio: async (_clipId: string) => {},
};
