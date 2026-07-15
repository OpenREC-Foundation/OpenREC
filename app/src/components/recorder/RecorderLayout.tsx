import { useEffect } from 'react';
import { useRecorder } from '../../hooks/useRecorder';
import ScreenCapture from './ScreenCapture';
import CameraCapture from './CameraCapture';
import AudioCapture from './AudioCapture';
import RecordingControls from './RecordingControls';
import BufferIndicator from './BufferIndicator';
import GlassPanel from '../ui/GlassPanel';

const RecorderLayout = () => {
  const { startRecorder, stopRecorder, recorderStatus, error } = useRecorder();

  useEffect(() => {
    startRecorder();
    return () => {
      stopRecorder();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Gravação Inteligente</h1>

      {error && (
        <GlassPanel className="p-4 border border-red-500/30 bg-red-500/10">
          <p className="text-red-400 text-sm">{error}</p>
        </GlassPanel>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ScreenCapture />
          <CameraCapture />
        </div>
        <div className="space-y-6">
          <AudioCapture />
          <BufferIndicator />
          <RecordingControls />
        </div>
      </div>
    </div>
  );
};

export default RecorderLayout;