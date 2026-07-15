export interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  rating: number;
  downloads: number;
  enabled: boolean;
  version?: string;
  permissions?: string[];
  category?: string;
  installed?: boolean;
  size?: number;
  updatedAt?: string;
}
