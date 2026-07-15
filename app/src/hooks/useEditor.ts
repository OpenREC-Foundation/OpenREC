import { useCallback } from 'react';
import { useEditorStore } from '../store/editorSlice';
import { engineService } from '../services/engine';

export const useEditor = () => {
  const store = useEditorStore();

  const loadProject = useCallback(async (projectId: string) => {
    try {
      store.setLoading(true);
      store.setError(null);
      const project = await engineService.loadProject(projectId);
      store.setProject(project);
      const tracks = await engineService.getTimeline(projectId);
      store.setTracks(tracks);
    } catch (err: any) {
      store.setError(err.message || 'Erro ao carregar projeto');
    } finally {
      store.setLoading(false);
    }
  }, []);

  const saveProject = useCallback(async () => {
    const project = useEditorStore.getState().project;
    if (!project) return;
    try {
      await engineService.saveProject(project);
    } catch (err: any) {
      store.setError(err.message);
    }
  }, []);

  const exportProject = useCallback(async (config: { resolution: string; format: string; aiEnhance: boolean }) => {
    const project = useEditorStore.getState().project;
    if (!project) return;
    try {
      store.setExporting(true);
      await engineService.exportProject(project.id, config);
    } catch (err: any) {
      store.setError(err.message);
    } finally {
      store.setExporting(false);
      store.setShowExport(false);
    }
  }, []);

  const selectClip = useCallback((clipId: string) => {
    store.setSelectedClipId(clipId);
  }, []);

  const addEffectToClip = useCallback((clipId: string, effectId: string) => {
    store.addEffectToClip(clipId, effectId);
  }, []);

  const updateClipProperty = useCallback((clipId: string, property: string, value: any) => {
    store.updateClipProperty(clipId, property, value);
  }, []);

  const showExportPanel = useCallback(() => {
    store.setShowExport(true);
  }, []);

  const hideExportPanel = useCallback(() => {
    store.setShowExport(false);
  }, []);

  return {
    ...store,
    loadProject,
    saveProject,
    exportProject,
    selectClip,
    addEffectToClip,
    updateClipProperty,
    showExportPanel,
    hideExportPanel,
  };
};
