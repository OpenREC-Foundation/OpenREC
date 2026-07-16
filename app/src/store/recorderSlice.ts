import { create } from 'zustand';

interface ScreenSource { id: string; name: string; stream: MediaStream | null }

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

  setScreenSource: (s: ScreenSource) => void;
  setAvailableSources: (s: { id: string; name: string }[]) => void;
  setCameraStream: (s: MediaStream | null) => void;
  setIsCameraEnabled: (e: boolean) => void;
  setAvailableCameras: (c: { id: string; name: string }[]) => void;
  setCameraDevice: (id: string) => void;
  toggleMic: () => void;
  toggleSystemAudio: () => void;
  toggleCamera: () => void;
  setMicLevel: (l: number) => void;
  setSystemAudioLevel: (l: number) => void;
  setIsRecording: (r: boolean) => void;
  setIsPaused: (p: boolean) => void;
  setDuration: (d: number) => void;
  setBufferSeconds: (s: number) => void;
  setMaxBuffer: (m: number) => void;
  setError: (e: string | null) => void;
  reset: () => void;
}

export const useRecorderStore = create<RecorderState>((set) => ({
  screenSource: null, availableSources: [], cameraStream: null, isCameraEnabled: false,
  availableCameras: [], activeCameraId: null, micEnabled: true, systemAudioEnabled: false,
  micLevel: 0, systemAudioLevel: 0, isRecording: false, isPaused: false, duration: 0,
  bufferSeconds: 0, maxBuffer: 120, error: null,

  setScreenSource: (s) => set({ screenSource: s }),
  setAvailableSources: (s) => set({ availableSources: s }),
  setCameraStream: (s) => set({ cameraStream: s }),
  setIsCameraEnabled: (e) => set({ isCameraEnabled: e }),
  setAvailableCameras: (c) => set({ availableCameras: c }),
  setCameraDevice: (id) => set({ activeCameraId: id }),
  toggleMic: () => set((s) => ({ micEnabled: !s.micEnabled })),
  toggleSystemAudio: () => set((s) => ({ systemAudioEnabled: !s.systemAudioEnabled })),
  toggleCamera: () => set((s) => ({ isCameraEnabled: !s.isCameraEnabled })),
  setMicLevel: (l) => set({ micLevel: l }),
  setSystemAudioLevel: (l) => set({ systemAudioLevel: l }),
  setIsRecording: (r) => set({ isRecording: r }),
  setIsPaused: (p) => set({ isPaused: p }),
  setDuration: (d) => set({ duration: d }),
  setBufferSeconds: (s) => set({ bufferSeconds: s }),
  setMaxBuffer: (m) => set({ maxBuffer: m }),
  setError: (e) => set({ error: e }),
  reset: () => set({ screenSource: null, cameraStream: null, isCameraEnabled: false, micEnabled: true, systemAudioEnabled: false, isRecording: false, isPaused: false, duration: 0, bufferSeconds: 0, error: null }),
}));
