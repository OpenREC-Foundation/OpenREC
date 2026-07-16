export const isTauri = (): boolean => typeof window !== 'undefined' && '__TAURI__' in window;
export const isMobile = (): boolean => /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
export const isPWA = (): boolean => window.matchMedia('(display-mode: standalone)').matches;
export const getPlatform = (): 'web'|'tauri'|'pwa'|'mobile' => {
  if (isTauri()) return 'tauri';
  if (isPWA()) return 'pwa';
  if (isMobile()) return 'mobile';
  return 'web';
};
export const supportsScreenCapture = (): boolean => 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices;
