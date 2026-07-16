import { useCallback } from 'react';
import { useEditorStore } from '../store/editorSlice';

export const useEditor = () => {
  const store = useEditorStore();
  const loadProject = useCallback(async (_id: string) => {}, []);
  const saveProject = useCallback(async () => {}, []);
  const exportProject = useCallback(async (_config: any) => {}, []);
  const selectClip = useCallback((id: string) => store.selectClip(id), [store]);
  const addEffectToClip = useCallback((clipId: string, effectId: string) => store.addEffectToClip(clipId, effectId), [store]);
  const updateClipProperty = useCallback((clipId: string, prop: string, val: any) => store.updateClipProperty(clipId, prop, val), [store]);
  const showExportPanel = useCallback(() => store.showExportPanel(), [store]);
  const hideExportPanel = useCallback(() => store.hideExport(), [store]);
  return { ...store, loadProject, saveProject, exportProject, selectClip, addEffectToClip, updateClipProperty, showExportPanel, hideExportPanel };
};
