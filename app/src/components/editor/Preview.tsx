import { useRef, useEffect } from 'react';
import { useEditorStore } from '../../store/editorSlice';

const Preview = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTime = useEditorStore((state) => state.currentTime);
  const isPlaying = useEditorStore((state) => state.isPlaying);
  const setPlaying = useEditorStore((state) => state.setPlaying);
  const setCurrentTime = useEditorStore((state) => state.setCurrentTime);
  const project = useEditorStore((state) => state.project);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentTime, isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    setPlaying(!isPlaying);
  };

  if (!project) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <p className="text-gray-500">Nenhum projeto aberto</p>
      </div>
    );
  }

  const durationSec = parseFloat(project.duration) || 0;

  return (
    <div className="relative flex-1 bg-black">
      <video
        ref={videoRef}
        src={project.previewUrl || ''}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={handlePlayPause}
      />
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 text-sm">
        {new Date(currentTime * 1000).toISOString().substr(11, 8)} / {new Date(durationSec * 1000).toISOString().substr(11, 8)}
      </div>
    </div>
  );
};

export default Preview;
