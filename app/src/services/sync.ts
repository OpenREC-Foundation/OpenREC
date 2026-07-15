interface SyncStatus {
  lastSync: string | null;
  pendingChanges: number;
  isSyncing: boolean;
}

const syncService = {
  getStatus: async (): Promise<SyncStatus> => {
    return {
      lastSync: null,
      pendingChanges: 0,
      isSyncing: false,
    };
  },

  syncNow: async (): Promise<void> => {
    throw new Error('Sincronização não configurada');
  },

  enableSync: async (provider: 'webdav' | 'nextcloud' | 'gdrive', config: Record<string, string>): Promise<void> => {
    throw new Error('Sincronização não configurada');
  },

  disableSync: async (): Promise<void> => {
    throw new Error('Sincronização não configurada');
  },
};

export { syncService };
export type { SyncStatus };
