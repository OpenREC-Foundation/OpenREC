export const storageService = {
  getStorageStatus: async () => ({ used: 0, total: 100 }),
  listProjects: async (): Promise<{id:string;name:string;lastModified:string;duration:string}[]> => [],
  createProject: async (_name: string): Promise<{id:string;name:string;lastModified:string;duration:string}> => ({ id: '', name: '', lastModified: '', duration: '' }),
  deleteProject: async (_projectId: string) => {},
  cleanupTemp: async () => {},
};
