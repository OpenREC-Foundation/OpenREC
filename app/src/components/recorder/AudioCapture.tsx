import { useRecorderStore } from '../../store/recorderSlice';
import GlassPanel from '../ui/GlassPanel';

const AudioCapture = () => {
  const micEnabled = useRecorderStore((state) => state.micEnabled);
  const systemAudioEnabled = useRecorderStore((state) => state.systemAudioEnabled);
  const toggleMic = useRecorderStore((state) => state.toggleMic);
  const toggleSystemAudio = useRecorderStore((state) => state.toggleSystemAudio);
  const micLevel = useRecorderStore((state) => state.micLevel);
  const systemAudioLevel = useRecorderStore((state) => state.systemAudioLevel);

  return (
    <GlassPanel className="p-6">
      <h2 className="text-xl font-semibold mb-4">Áudio</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Microfone</span>
          <button
            onClick={toggleMic}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              micEnabled ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'
            }`}
          >
            {micEnabled ? 'Ativo' : 'Mudo'}
          </button>
        </div>
        {micEnabled && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${Math.min(micLevel * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-10 text-right">
              {Math.round(micLevel * 100)}%
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm">Áudio do Sistema</span>
          <button
            onClick={toggleSystemAudio}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              systemAudioEnabled ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'
            }`}
          >
            {systemAudioEnabled ? 'Ativo' : 'Mudo'}
          </button>
        </div>
        {systemAudioEnabled && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${Math.min(systemAudioLevel * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 w-10 text-right">
              {Math.round(systemAudioLevel * 100)}%
            </span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

export default AudioCapture;