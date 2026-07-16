export const isValidProjectName = (name: string): boolean => name.trim().length >= 1 && name.trim().length <= 100;
export const isValidPackFile = (filename: string): boolean => filename.endsWith('.openrecpack');
export const isValidPluginFile = (filename: string): boolean => filename.endsWith('.wasm');
export const isValidResolution = (res: string): boolean => ['720p','1080p','4k','8k'].includes(res);
export const isValidFormat = (format: string): boolean => ['mp4','webm','mov'].includes(format);
