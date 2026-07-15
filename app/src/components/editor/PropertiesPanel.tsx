import { useEditorStore } from '../../store/editorSlice';

const PropertiesPanel = () => {
  const selectedClipId = useEditorStore((state) => state.selectedClipId);
  const clips = useEditorStore((state) => state.tracks.flatMap((t) => t.clips));
  const clip = clips.find((c) => c.id === selectedClipId);
  const updateClipProperty = useEditorStore((state) => state.updateClipProperty);

  if (!clip) {
    return (
      <p className="text-sm text-gray-500 text-center mt-8">
        Selecione um clipe para ver propriedades
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-gray-400 block mb-1">Nome</label>
        <input
          type="text"
          value={clip.name}
          onChange={(e) => updateClipProperty(clip.id, 'name', e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
        />
      </div>
      <div>
        <label className="text-xs text-gray-400 block mb-1">Duração (s)</label>
        <input
          type="number"
          value={clip.duration}
          onChange={(e) => updateClipProperty(clip.id, 'duration', Number(e.target.value))}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
        />
      </div>
      <div>
        <label className="text-xs text-gray-400 block mb-1">Início (s)</label>
        <input
          type="number"
          value={clip.startTime}
          onChange={(e) => updateClipProperty(clip.id, 'startTime', Number(e.target.value))}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
        />
      </div>
    </div>
  );
};

export default PropertiesPanel;