import { useState } from 'react';
import { useEditorStore } from '../../store/editorSlice';
import EffectsPanel from './EffectsPanel';
import PropertiesPanel from './PropertiesPanel';

type Tab = 'effects' | 'properties' | 'ai';

const ToolPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>('effects');
  const selectedClipId = useEditorStore((state) => state.selectedClipId);
  const aiSuggestions = useEditorStore((state) => state.aiSuggestions);

  return (
    <div className="w-72 border-l border-white/5 bg-gray-900 flex flex-col">
      <div className="flex border-b border-white/5">
        {(['effects', 'properties', 'ai'] as Tab[]).map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-3 text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'effects' && 'Efeitos'}
            {tab === 'properties' && 'Propriedades'}
            {tab === 'ai' && `AI (${aiSuggestions.length})`}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'effects' && <EffectsPanel />}
        {activeTab === 'properties' && <PropertiesPanel />}
        {activeTab === 'ai' && <AISuggestionsPanel />}
      </div>
    </div>
  );
};

const AISuggestionsPanel = () => {
  const suggestions = useEditorStore((state) => state.aiSuggestions);
  const applySuggestion = useEditorStore((state) => state.applyAISuggestion);

  if (suggestions.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center mt-8">
        Nenhuma sugestão da IA no momento
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="p-3 rounded-lg bg-white/5 border border-white/5"
        >
          <p className="text-sm">{suggestion.description}</p>
          <div className="flex gap-2 mt-2">
            <button
              className="text-xs px-3 py-1 rounded bg-violet-500/20 text-violet-300 hover:bg-violet-500/30"
              onClick={() => applySuggestion(suggestion.id)}
            >
              Aplicar
            </button>
            <button className="text-xs px-3 py-1 rounded bg-white/10 text-gray-400 hover:bg-white/20">
              Ignorar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolPanel;