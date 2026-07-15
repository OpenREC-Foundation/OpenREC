export const isTauri = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI__' in window;
};

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
};

export const isPWA = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches;
};

export const getPlatform = (): 'web' | 'tauri' | 'pwa' | 'mobile' => {
  if (isTauri()) return 'tauri';
  if (isPWA()) return 'pwa';
  if (isMobile()) return 'mobile';
  return 'web';
};

export const supportsScreenCapture = (): boolean => {
  return typeof navigator !== 'undefined' && 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices;
};

export const supportsCamera = (): boolean => {
  return typeof navigator !== 'undefined' && 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
};
