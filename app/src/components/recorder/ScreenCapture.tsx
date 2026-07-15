import { useRecorderStore } from '../../store/recorderSlice';
import GlassPanel from '../ui/GlassPanel';

const ScreenCapture = () => {
  const screenSource = useRecorderStore((state) => state.screenSource);
  const setScreenSource = useRecorderStore((state) => state.setScreenSource);
  const availableSources = useRecorderStore((state) => state.availableSources);
  const isRecording = useRecorderStore((state) => state.isRecording);

  return (
    <GlassPanel className="p-6">
      <h2 className="text-xl font-semibold mb-4">Captura de Tela</h2>

      {screenSource ? (
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          <video
            srcObject={screenSource.stream}
            autoPlay
            muted
            className="w-full h-full object-contain"
          />
          {isRecording && (
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500/90 rounded-full px-3 py-1 text-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Gravando
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Selecione uma fonte de tela</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {availableSources.map((source) => (
          <button
            key={source.id}
            onClick={() => setScreenSource(source.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              screenSource?.id === source.id
                ? 'bg-violet-500 text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            {source.name}
          </button>
        ))}
        {availableSources.length === 0 && (
          <p className="text-sm text-gray-500">Nenhuma tela ou janela disponível</p>
        )}
      </div>
    </GlassPanel>
  );
};

export default ScreenCapture;