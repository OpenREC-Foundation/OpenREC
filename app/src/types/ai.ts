export interface AISuggestion {
  id: string;
  description: string;
  type: 'cut' | 'effect' | 'transition' | 'text' | 'audio';
  timestamp: number;
  confidence: number;
  applied?: boolean;
  previewUrl?: string;
}

export type AIStatus = 'idle' | 'analyzing' | 'processing' | 'processing_audio' | 'upscaling' | 'error';

export interface AIProgress {
  status: AIStatus;
  progress: number;
  currentTask?: string;
}

export interface SuperResolutionOptions {
  clipId: string;
  targetResolution: '720p' | '1080p' | '4k' | '8k';
  enhanceSharpness?: boolean;
  reduceNoise?: boolean;
  recoverDetails?: boolean;
}

export interface AudioEnhancementOptions {
  clipId: string;
  removeNoise?: boolean;
  reduceEcho?: boolean;
  enhanceVoice?: boolean;
  autoEQ?: boolean;
  normalizeVolume?: boolean;
}
