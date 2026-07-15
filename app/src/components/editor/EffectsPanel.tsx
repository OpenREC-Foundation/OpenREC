import { useEditorStore } from '../../store/editorSlice';

const EffectsPanel = () => {
  const addEffectToClip = useEditorStore((state) => state.addEffectToClip);
  const selectedClipId = useEditorStore((state) => state.selectedClipId);

  const effects = [
    { id: 'zoom', name: 'Zoom', icon: '🔍' },
    { id: 'shake', name: 'Shake', icon: '💥' },
    { id: 'fade', name: 'Fade In/Out', icon: '🌑' },
    { id: 'speed', name: 'Velocidade', icon: '⚡' },
    { id: 'blur', name: 'Blur', icon: '🌫️' },
  ];

  const handleAddEffect = (effectId: string) => {
    if (selectedClipId) {
      addEffectToClip(selectedClipId, effectId);
    }
  };

  if (!selectedClipId) {
    return (
      <p className="text-sm text-gray-500 text-center mt-8">
        Selecione um clipe para aplicar efeitos
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400 mb-2">Arraste ou clique para aplicar</p>
      {effects.map((effect) => (
        <button
          key={effect.id}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
          onClick={() => handleAddEffect(effect.id)}
        >
          <span>{effect.icon}</span>
          <span className="text-sm">{effect.name}</span>
        </button>
      ))}
    </div>
  );
};

export default EffectsPanel;