interface ScreenSource {
  id: string;
  name: string;
}

interface AudioLevels {
  mic: number;
  system: number;
}

interface BufferStatus {
  current: number;
  recordingDuration: number;
}

interface RecordingConfig {
  screenSourceId?: string;
  cameraEnabled: boolean;
  micEnabled: boolean;
  systemAudioEnabled: boolean;
}

interface ExportConfig {
  resolution: string;
  format: string;
  aiEnhance: boolean;
}

interface Project {
  id: string;
  name: string;
  duration: number;
  previewUrl?: string;
}

interface Track {
  id: string;
  name: string;
  clips: any[];
}

const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;

const invoke = async (command: string, args?: Record<string, any>): Promise<any> => {
  if (isTauri) {
    const { invoke: tauriInvoke } = await import('@tauri-apps/api/tauri');
    return tauriInvoke(command, args);
  }
  throw new Error('Engine não disponível no ambiente atual');
};

const engineService = {
  initRecorder: async (): Promise<void> => {
    await invoke('init_recorder');
  },

  getScreenSources: async (): Promise<ScreenSource[]> => {
    return invoke('get_screen_sources');
  },

  getCameraDevices: async (): Promise<{ id: string; name: string }[]> => {
    return invoke('get_camera_devices');
  },

  setScreenSource: async (sourceId: string): Promise<MediaStream> => {
    return invoke('set_screen_source', { sourceId });
  },

  enableCamera: async (deviceId: string | null): Promise<MediaStream> => {
    return invoke('enable_camera', { deviceId });
  },

  disableCamera: (): void => {
    if (isTauri) {
      invoke('disable_camera').catch(() => {});
    }
  },

  startRecording: async (config: RecordingConfig): Promise<void> => {
    await invoke('start_recording', { config });
  },

  stopRecording: async (): Promise<void> => {
    await invoke('stop_recording');
  },

  pauseRecording: async (): Promise<void> => {
    await invoke('pause_recording');
  },

  resumeRecording: async (): Promise<void> => {
    await invoke('resume_recording');
  },

  saveBuffer: async (): Promise<void> => {
    await invoke('save_buffer');
  },

  getAudioLevels: async (): Promise<AudioLevels> => {
    return invoke('get_audio_levels');
  },

  getBufferStatus: async (): Promise<BufferStatus> => {
    return invoke('get_buffer_status');
  },

  stopRecorder: async (): Promise<void> => {
    await invoke('stop_recorder');
  },

  loadProject: async (projectId: string): Promise<Project> => {
    return invoke('load_project', { projectId });
  },

  getTimeline: async (projectId: string): Promise<Track[]> => {
    return invoke('get_timeline', { projectId });
  },

  saveProject: async (project: Project): Promise<void> => {
    await invoke('save_project', { project });
  },

  exportProject: async (projectId: string, config: ExportConfig): Promise<void> => {
    await invoke('export_project', { projectId, config });
  },
};

export { engineService };
export type { ScreenSource, AudioLevels, BufferStatus, RecordingConfig, ExportConfig, Project, Track };
