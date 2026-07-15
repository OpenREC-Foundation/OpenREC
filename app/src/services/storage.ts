interface StorageStatus {
  used: number;
  total: number;
}

interface Project {
  id: string;
  name: string;
  lastModified: string;
  duration: string;
  thumbnail?: string;
}

const storageService = {
  getStorageStatus: async (): Promise<StorageStatus> => {
    throw new Error('Armazenamento não disponível');
  },

  listProjects: async (): Promise<Project[]> => {
    throw new Error('Armazenamento não disponível');
  },

  createProject: async (name: string): Promise<Project> => {
    throw new Error('Armazenamento não disponível');
  },

  deleteProject: async (projectId: string): Promise<void> => {
    throw new Error('Armazenamento não disponível');
  },

  cleanupTemp: async (): Promise<void> => {
    throw new Error('Armazenamento não disponível');
  },
};

export { storageService };
export type { StorageStatus, Project };
