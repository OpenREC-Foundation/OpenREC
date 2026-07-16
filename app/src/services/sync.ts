export const syncService = {
  getStatus: async () => ({ lastSync: null, pendingChanges: 0, isSyncing: false }),
  syncNow: async () => {},
  enableSync: async (_provider: string, _config: Record<string,string>) => {},
  disableSync: async () => {},
};
