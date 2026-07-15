import { create } from 'zustand';

interface ScreenSource {
  id: string;
  name: string;
  stream: MediaStream | null;
}

interface RecorderState {
  screenSource: ScreenSource | null;
  availableSources: { id: string; name: string }[];
  cameraStream: MediaStream | null;
  isCameraEnabled: boolean;
  availableCameras: { id: string; name: string }[];
  activeCameraId: string | null;
  micEnabled: boolean;
  systemAudioEnabled: boolean;
  micLevel: number;
  systemAudioLevel: number;
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  bufferSeconds: number;
  maxBuffer: number;
  error: string | null;

  setScreenSource: (source: ScreenSource) => void;
  setAvailableSources: (sources: { id: string; name: string }[]) => void;
  setCameraStream: (stream: MediaStream | null) => void;
  setIsCameraEnabled: (enabled: boolean) => void;
  setAvailableCameras: (cameras: { id: string; name: string }[]) => void;
  setCameraDevice: (deviceId: string) => void;
  toggleMic: () => void;
  toggleSystemAudio: () => void;
  setMicLevel: (level: number) => void;
  setSystemAudioLevel: (level: number) => void;
  setIsRecording: (recording: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  setDuration: (duration: number) => void;
  setBufferSeconds: (seconds: number) => void;
  setMaxBuffer: (max: number) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  screenSource: null,
  availableSources: [],
  cameraStream: null,
  isCameraEnabled: false,
  availableCameras: [],
  activeCameraId: null,
  micEnabled: true,
  systemAudioEnabled: false,
  micLevel: 0,
  systemAudioLevel: 0,
  isRecording: false,
  isPaused: false,
  duration: 0,
  bufferSeconds: 0,
  maxBuffer: 120,
  error: null,
};

export const useRecorderStore = create<RecorderState>((set) => ({
  ...initialState,

  setScreenSource: (source) => set({ screenSource: source }),
  setAvailableSources: (sources) => set({ availableSources: sources }),
  setCameraStream: (stream) => set({ cameraStream: stream }),
  setIsCameraEnabled: (enabled) => set({ isCameraEnabled: enabled }),
  setAvailableCameras: (cameras) => set({ availableCameras: cameras }),
  setCameraDevice: (deviceId) => set({ activeCameraId: deviceId }),
  toggleMic: () => set((state) => ({ micEnabled: !state.micEnabled })),
  toggleSystemAudio: () => set((state) => ({ systemAudioEnabled: !state.systemAudioEnabled })),
  setMicLevel: (level) => set({ micLevel: level }),
  setSystemAudioLevel: (level) => set({ systemAudioLevel: level }),
  setIsRecording: (recording) => set({ isRecording: recording }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setDuration: (duration) => set({ duration }),
  setBufferSeconds: (seconds) => set({ bufferSeconds: seconds }),
  setMaxBuffer: (max) => set({ maxBuffer: max }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
