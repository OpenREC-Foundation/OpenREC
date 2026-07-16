import { useRef, useCallback } from 'react';
import { useEditorStore } from '../../store/editorSlice';
import TimelineTrack from './TimelineTrack';

const Timeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const project = useEditorStore(s => s.project);
  const currentTime = useEditorStore(s => s.currentTime);
  const setCurrentTime = useEditorStore(s => s.setCurrentTime);
  const tracks = useEditorStore(s => s.tracks);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!timelineRef.current || !project) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = (x / rect.width) * parseFloat(project.duration);
    setCurrentTime(time);
  }, [project, setCurrentTime]);

  if (!project) return null;
  return (
    <div className="h-48 border-t border-white/5 bg-gray-900 flex flex-col">
      <div className="flex items-center h-8 px-4 text-xs text-gray-400 border-b border-white/5 gap-4">
        <button className="hover:text-white">+ Adicionar faixa</button>
        <button className="hover:text-white">Zoom +</button>
        <button className="hover:text-white">Zoom -</button>
        <span className="ml-auto">{project.duration}s</span>
      </div>
      <div ref={timelineRef} className="flex-1 relative overflow-x-auto" onClick={handleClick}>
        <div className="relative h-full" style={{ width: `${parseFloat(project.duration) * 100}px` }}>
          <div className="absolute top-0 bottom-0 w-px bg-red-500 z-10" style={{ left: `${(currentTime / parseFloat(project.duration)) * 100}%` }} />
          {tracks.map(t => <TimelineTrack key={t.id} track={t} />)}
        </div>
      </div>
    </div>
  );
};
export default Timeline;
