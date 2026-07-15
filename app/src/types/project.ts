export interface Project {
  id: string;
  name: string;
  lastModified: string;
  duration: string;
  thumbnail?: string;
  previewUrl?: string;
  resolution?: {
    width: number;
    height: number;
  };
  frameRate?: number;
  created: string;
  source?: 'recorder' | 'import';
}
