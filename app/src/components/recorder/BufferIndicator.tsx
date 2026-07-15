import { useRecorderStore } from '../../store/recorderSlice';
import GlassPanel from '../ui/GlassPanel';

const BufferIndicator = () => {
  const bufferSeconds = useRecorderStore((state) => state.bufferSeconds);
  const maxBuffer = useRecorderStore((state) => state.maxBuffer);
  const isRecording = useRecorderStore((state) => state.isRecording);

  const percentage = (bufferSeconds / maxBuffer) * 100;

  return (
    <GlassPanel className="p-6">
      <h2 className="text-xl font-semibold mb-4">Buffer de Replay</h2>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-bold">{bufferSeconds}s</span>
        <span className="text-gray-400 text-sm mb-1">/ {maxBuffer}s</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${isRecording ? 'bg-violet-500' : 'bg-gray-600'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {!isRecording && (
        <p className="text-xs text-gray-500 mt-2">
          Inicie a gravação para preencher o buffer
        </p>
      )}
    </GlassPanel>
  );
};

export default BufferIndicator;