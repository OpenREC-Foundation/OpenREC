export const isValidProjectName = (name: string): boolean => {
  return name.trim().length >= 1 && name.trim().length <= 100;
};

export const isValidPackFile = (filename: string): boolean => {
  return filename.endsWith('.openrecpack');
};

export const isValidPluginFile = (filename: string): boolean => {
  return filename.endsWith('.wasm');
};

export const isValidResolution = (res: string): boolean => {
  return ['720p', '1080p', '4k', '8k'].includes(res);
};

export const isValidFormat = (format: string): boolean => {
  return ['mp4', 'webm', 'mov'].includes(format);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
