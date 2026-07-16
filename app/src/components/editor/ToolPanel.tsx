import { useState } from 'react';
import { useEditorStore } from '../../store/editorSlice';
import EffectsPanel from './EffectsPanel';
import PropertiesPanel from './PropertiesPanel';

const ToolPanel = () => {
  const [activeTab, setActiveTab] = useState<'effects'|'properties'|'ai'>('effects');
  const aiSuggestions = useEditorStore((s) => s.aiSuggestions);

  return (
    <div className="w-72 border-l border-white/5 bg-gray-900 flex flex-col">
      <div className="flex border-b border-white/5">
        {(['effects','properties','ai'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-medium ${activeTab === tab ? 'text-violet-400 border-b-2 border-violet-400' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {tab === 'effects' ? 'Efeitos' : tab === 'properties' ? 'Propriedades' : `AI (${aiSuggestions.length})`}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'effects' && <EffectsPanel />}
        {activeTab === 'properties' && <PropertiesPanel />}
        {activeTab === 'ai' && <AIPanel />}
      </div>
    </div>
  );
};

const AIPanel = () => {
  const suggestions = useEditorStore((s) => s.aiSuggestions);
  const apply = useEditorStore((s) => s.applyAISuggestion);
  if (!suggestions.length) return <div className="text-sm text-gray-500 text-center mt-8">Nenhuma sugestão</div>;
  return (
    <div className="space-y-3">
      {suggestions.map((s) => (
        <div key={s.id} className="p-3 rounded-lg bg-white/5">
          <p className="text-sm">{s.description}</p>
          <button onClick={() => apply(s.id)} className="text-xs px-3 py-1 rounded bg-violet-500/20 text-violet-300 mt-2">Aplicar</button>
        </div>
      ))}
    </div>
  );
};

export default ToolPanel;
