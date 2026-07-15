export interface Pack {
  id: string;
  name: string;
  icon: string;
  author: string;
  rating: number;
  downloads: number;
  version: string;
  description?: string;
  tags?: string[];
  category?: 'gaming' | 'cinematic' | 'shorts' | 'vlog' | 'corporate' | 'custom';
  installed?: boolean;
  size?: number;
  updatedAt?: string;
  aiRules?: Record<string, any>;
}
