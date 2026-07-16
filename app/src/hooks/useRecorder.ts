import { useCallback } from 'react';
import { useRecorderStore } from '../store/recorderSlice';

export const useRecorder = () => {
  const store = useRecorderStore();
  const setScreenSource = useCallback(async (sourceId: string) => {
    try {
      store.setScreenSource({ id: sourceId, name: 'Tela', stream: null });
    } catch (e: any) {
      store.setError(e.message);
    }
  }, [store]);
  const toggleCamera = useCallback(() => store.toggleCamera(), [store]);
  return { ...store, setScreenSource, toggleCamera, startRecorder: async () => {}, stopRecorder: async () => {}, startRecording: async () => {}, stopRecording: async () => {}, pauseRecording: async () => {}, resumeRecording: async () => {}, saveBuffer: async () => {} };
};
