import { useEditorStore } from '../../store/editorSlice';
import { MediaClip } from '../../types/media';

interface Props {
  clip: MediaClip;
}

const TimelineClip = ({ clip }: Props) => {
  const selectClip = useEditorStore((state) => state.selectClip);
  const selectedClipId = useEditorStore((state) => state.selectedClipId);

  const isSelected = selectedClipId === clip.id;

  return (
    <div
      className={`absolute top-1 bottom-1 rounded-md cursor-pointer overflow-hidden border ${
        isSelected ? 'border-violet-500' : 'border-white/10'
      } hover:border-violet-400 transition-colors`}
      style={{
        left: `${(clip.startTime / (clip.projectDuration || 1)) * 100}%`,
        width: `${(clip.duration / (clip.projectDuration || 1)) * 100}%`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectClip(clip.id);
      }}
    >
      <div className="bg-violet-500/30 h-full flex items-center px-2">
        <span className="text-xs truncate">{clip.name}</span>
      </div>
    </div>
  );
};

export default TimelineClip;