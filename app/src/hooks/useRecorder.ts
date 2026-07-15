import { useEffect, useCallback } from 'react';
import { useRecorderStore } from '../store/recorderSlice';
import { engineService } from '../services/engine';

export const useRecorder = () => {
  const store = useRecorderStore();

  const startRecorder = useCallback(async () => {
    try {
      store.setError(null);
      await engineService.initRecorder();
      const sources = await engineService.getScreenSources();
      store.setAvailableSources(sources);
      const cameras = await engineService.getCameraDevices();
      store.setAvailableCameras(cameras);
    } catch (err: any) {
      store.setError(err.message || 'Erro ao iniciar gravador');
    }
  }, []);

  const stopRecorder = useCallback(async () => {
    try {
      await engineService.stopRecorder();
      store.reset();
    } catch (err: any) {
      store.setError(err.message);
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      store.setError(null);
      await engineService.startRecording({
        screenSourceId: store.screenSource?.id,
        cameraEnabled: store.isCameraEnabled,
        micEnabled: store.micEnabled,
        systemAudioEnabled: store.systemAudioEnabled,
      });
      store.setIsRecording(true);
    } catch (err: any) {
      store.setError(err.message || 'Falha ao iniciar gravação');
    }
  }, [store.screenSource, store.isCameraEnabled, store.micEnabled, store.systemAudioEnabled]);

  const stopRecording = useCallback(async () => {
    try {
      await engineService.stopRecording();
      store.setIsRecording(false);
      store.setIsPaused(false);
    } catch (err: any) {
      store.setError(err.message);
    }
  }, []);

  const pauseRecording = useCallback(async () => {
    try {
      await engineService.pauseRecording();
      store.setIsPaused(true);
    } catch (err: any) {
      store.setError(err.message);
    }
  }, []);

  const resumeRecording = useCallback(async () => {
    try {
      await engineService.resumeRecording();
      store.setIsPaused(false);
    } catch (err: any) {
      store.setError(err.message);
    }
  }, []);

  const saveBuffer = useCallback(async () => {
    try {
      await engineService.saveBuffer();
    } catch (err: any) {
      store.setError(err.message);
    }
  }, []);

  const toggleCamera = useCallback(async () => {
    if (!store.isCameraEnabled) {
      try {
        const stream = await engineService.enableCamera(store.activeCameraId);
        store.setCameraStream(stream);
        store.setIsCameraEnabled(true);
      } catch (err: any) {
        store.setError(err.message);
      }
    } else {
      engineService.disableCamera();
      store.setCameraStream(null);
      store.setIsCameraEnabled(false);
    }
  }, [store.isCameraEnabled, store.activeCameraId]);

  const setScreenSource = useCallback(async (sourceId: string) => {
    try {
      const stream = await engineService.setScreenSource(sourceId);
      store.setScreenSource({ id: sourceId, stream, name: stream.getVideoTracks()[0]?.label || 'Tela' });
    } catch (err: any) {
      store.setError(err.message);
    }
  }, []);

  useEffect(() => {
    if (!store.isRecording) return;
    const interval = setInterval(async () => {
      try {
        const levels = await engineService.getAudioLevels();
        store.setMicLevel(levels.mic);
        store.setSystemAudioLevel(levels.system);
        const buffer = await engineService.getBufferStatus();
        store.setBufferSeconds(buffer.current);
        store.setDuration(buffer.recordingDuration);
      } catch (err) {
        // polling silencioso
      }
    }, 200);
    return () => clearInterval(interval);
  }, [store.isRecording]);

  return {
    ...store,
    startRecorder,
    stopRecorder,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    saveBuffer,
    toggleCamera,
    setScreenSource,
  };
};
