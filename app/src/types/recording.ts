export interface ScreenSource {
  id: string;
  name: string;
  stream?: MediaStream | null;
  thumbnail?: string;
}

export interface RecordingConfig {
  screenSourceId?: string;
  cameraEnabled: boolean;
  micEnabled: boolean;
  systemAudioEnabled: boolean;
  resolution?: {
    width: number;
    height: number;
  };
  frameRate?: number;
  bitrate?: number;
  codec?: 'h264' | 'av1' | 'vp9';
}

export interface AudioLevels {
  mic: number;
  system: number;
}

export interface BufferStatus {
  current: number;
  max: number;
  recordingDuration: number;
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  duration: number;
  bufferSeconds: number;
  maxBuffer: number;
}
