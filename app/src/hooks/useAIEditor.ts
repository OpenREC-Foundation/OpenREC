import { useCallback } from 'react';
import { useAIStore } from '../store/aiSlice';
import { aiService } from '../services/ai';

export const useAIEditor = () => {
  const store = useAIStore();

  const analyzeProject = useCallback(async (projectId: string) => {
    try {
      store.setStatus('analyzing');
      store.setProgress(0);
      const suggestions = await aiService.analyzeProject(projectId, (progress) => {
        store.setProgress(progress);
      });
      store.setSuggestions(suggestions);
      store.setStatus('idle');
    } catch (err: any) {
      store.setError(err.message);
      store.setStatus('error');
    }
  }, []);

  const applySuggestion = useCallback(async (suggestionId: string) => {
    try {
      store.setStatus('processing');
      await aiService.applySuggestion(suggestionId);
      store.removeSuggestion(suggestionId);
      store.setStatus('idle');
    } catch (err: any) {
      store.setError(err.message);
      store.setStatus('error');
    }
  }, []);

  const runSuperResolution = useCallback(async (clipId: string, targetResolution: string) => {
    try {
      store.setStatus('upscaling');
      await aiService.superResolution(clipId, targetResolution);
      store.setStatus('idle');
    } catch (err: any) {
      store.setError(err.message);
      store.setStatus('error');
    }
  }, []);

  const enhanceAudio = useCallback(async (clipId: string) => {
    try {
      store.setStatus('processing_audio');
      await aiService.enhanceAudio(clipId);
      store.setStatus('idle');
    } catch (err: any) {
      store.setError(err.message);
      store.setStatus('error');
    }
  }, []);

  return {
    ...store,
    analyzeProject,
    applySuggestion,
    runSuperResolution,
    enhanceAudio,
  };
};
