import TimelineClip from './TimelineClip';
import { Track } from '../../types/media';

interface Props {
  track: Track;
}

const TimelineTrack = ({ track }: Props) => {
  return (
    <div className="h-12 border-b border-white/5 flex items-center relative">
      <div className="w-24 px-2 text-xs text-gray-400 truncate border-r border-white/5 h-full flex items-center">
        {track.name}
      </div>
      <div className="flex-1 h-full relative">
        {track.clips.map((clip) => (
          <TimelineClip key={clip.id} clip={clip} />
        ))}
      </div>
    </div>
  );
};

export default TimelineTrack;