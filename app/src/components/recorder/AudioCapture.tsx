import { useRecorderStore } from '../../store/recorderSlice';
import GlassPanel from '../ui/GlassPanel';

const CameraCapture = () => {
  const cameraStream = useRecorderStore((state) => state.cameraStream);
  const isCameraEnabled = useRecorderStore((state) => state.isCameraEnabled);
  const toggleCamera = useRecorderStore((state) => state.toggleCamera);
  const availableCameras = useRecorderStore((state) => state.availableCameras);
  const setCameraDevice = useRecorderStore((state) => state.setCameraDevice);
  const activeCameraId = useRecorderStore((state) => state.activeCameraId);

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Câmera</h2>
        <button
          onClick={toggleCamera}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            isCameraEnabled ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-gray-400'
          }`}
        >
          {isCameraEnabled ? 'Ativada' : 'Desativada'}
        </button>
      </div>

      {isCameraEnabled && cameraStream ? (
        <div className="w-40 h-30 rounded-lg overflow-hidden border-2 border-violet-500/50">
          <video
            srcObject={cameraStream}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>
      ) : isCameraEnabled ? (
        <div className="w-40 h-30 rounded-lg bg-gray-900 flex items-center justify-center">
          <p className="text-xs text-gray-500">Nenhuma câmera</p>
        </div>
      ) : null}

      {availableCameras.length > 0 && (
        <select
          value={activeCameraId || ''}
          onChange={(e) => setCameraDevice(e.target.value)}
          className="mt-3 w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
        >
          {availableCameras.map((cam) => (
            <option key={cam.id} value={cam.id}>{cam.name}</option>
          ))}
        </select>
      )}
    </GlassPanel>
  );
};

export default CameraCapture;