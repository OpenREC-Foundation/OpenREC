export interface MediaClip {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  projectDuration?: number;
  source: string;
  type: 'video' | 'audio' | 'image';
  effects: string[];
  properties: Record<string, any>;
}

export interface Track {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'effect';
  clips: MediaClip[];
  locked: boolean;
  hidden: boolean;
}
