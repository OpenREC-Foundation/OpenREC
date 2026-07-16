import { useRecorderStore } from '../../store/recorderSlice';
import { useRecorder } from '../../hooks/useRecorder';
import GlassPanel from '../ui/GlassPanel';

const ScreenCapture = () => {
  const screenSource = useRecorderStore(s => s.screenSource);
  const availableSources = useRecorderStore(s => s.availableSources);
  const isRecording = useRecorderStore(s => s.isRecording);
  const { setScreenSource } = useRecorder();

  return (
    <GlassPanel className="p-6">
      <h2 className="text-xl font-semibold mb-4">Captura de Tela</h2>
      {screenSource ? (
        <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
          <video ref={el => { if (el && screenSource.stream) el.srcObject = screenSource.stream; }} autoPlay muted className="w-full h-full object-contain" />
          {isRecording && <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500/90 rounded-full px-3 py-1 text-sm"><div className="w-2 h-2 rounded-full bg-white animate-pulse" />Gravando</div>}
        </div>
      ) : (
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center"><p className="text-gray-500">Selecione uma fonte de tela</p></div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {availableSources.map(s => <button key={s.id} onClick={() => setScreenSource(s.id)} className={`px-4 py-2 rounded-lg text-sm ${screenSource?.id===s.id ? 'bg-violet-500 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'}`}>{s.name}</button>)}
      </div>
    </GlassPanel>
  );
};
export default ScreenCapture;
