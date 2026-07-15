import { useState } from 'react';
import { useEditorStore } from '../../store/editorSlice';

const ExportPanel = () => {
  const [resolution, setResolution] = useState('1080p');
  const [format, setFormat] = useState('mp4');
  const [useAI, setUseAI] = useState(true);
  const hideExport = useEditorStore((state) => state.hideExport);
  const exportProject = useEditorStore((state) => state.exportProject);

  const handleExport = () => {
    exportProject({ resolution, format, aiEnhance: useAI });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-96 space-y-4">
        <h2 className="text-xl font-semibold">Exportar Projeto</h2>

        <div>
          <label className="text-xs text-gray-400 block mb-1">Resolução</label>
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="4k">4K</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">Formato</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="mov">MOV</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Melhoria por IA</span>
          <button
            className={`w-10 h-5 rounded-full transition-colors ${useAI ? 'bg-violet-500' : 'bg-gray-700'}`}
            onClick={() => setUseAI(!useAI)}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${useAI ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={hideExport}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-sm font-medium"
          >
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;