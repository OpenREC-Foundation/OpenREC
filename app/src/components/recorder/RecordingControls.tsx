import { useRecorderStore } from '../../store/recorderSlice';
import { useRecorder } from '../../hooks/useRecorder';

const RecordingControls = () => {
  const isRecording = useRecorderStore((state) => state.isRecording);
  const isPaused = useRecorderStore((state) => state.isPaused);
  const duration = useRecorderStore((state) => state.duration);
  const { startRecording, stopRecording, pauseRecording, resumeRecording, saveBuffer } = useRecorder();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-violet-500 hover:bg-violet-600 text-white'
        }`}
      >
        {isRecording ? 'Parar Gravação' : 'Iniciar Gravação'}
      </button>

      {isRecording && (
        <div className="flex gap-3">
          <button
            onClick={isPaused ? resumeRecording : pauseRecording}
            className="flex-1 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            {isPaused ? 'Retomar' : 'Pausar'}
          </button>
          <button
            onClick={saveBuffer}
            className="flex-1 py-2.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 font-medium transition-colors"
          >
            Salvar Momento
          </button>
        </div>
      )}

      <div className="text-center text-2xl font-mono tabular-nums">
        {formatTime(duration)}
      </div>
    </div>
  );
};

export default RecordingControls;