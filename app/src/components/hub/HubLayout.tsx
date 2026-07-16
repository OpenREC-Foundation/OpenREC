import { useState } from 'react';
import { useHub } from '../../hooks/useHub';
import SearchBar from '../shared/SearchBar';
import GlassPanel from '../ui/GlassPanel';
import PackCard from './PackCard';
import PluginCard from './PluginCard';

const HubLayout = () => {
  const [activeTab, setActiveTab] = useState<'packs'|'plugins'>('packs');
  const { packs, plugins, isLoading, error, search, setSearch } = useHub();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">OpenREC Hub</h1>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar packs e plugins..." />
      </div>
      <div className="flex gap-2 border-b border-white/5 pb-2">
        <button onClick={() => setActiveTab('packs')} className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab==='packs'?'bg-violet-500/20 text-violet-300 border-b-2 border-violet-500':'text-gray-400'}`}>Packs</button>
        <button onClick={() => setActiveTab('plugins')} className={`px-4 py-2 text-sm font-medium rounded-t-lg ${activeTab==='plugins'?'bg-violet-500/20 text-violet-300 border-b-2 border-violet-500':'text-gray-400'}`}>Plugins</button>
      </div>
      {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{[1,2,3].map(i => <div key={i} className="h-48 rounded-xl bg-white/5 animate-pulse" />)}</div>}
      {error && <GlassPanel className="p-6 text-center"><p className="text-red-400">Erro ao carregar</p></GlassPanel>}
      {!isLoading && !error && activeTab==='packs' && packs.length===0 && <GlassPanel className="p-12 text-center"><p className="text-gray-400">Nenhum pack encontrado</p></GlassPanel>}
      {!isLoading && !error && activeTab==='plugins' && plugins.length===0 && <GlassPanel className="p-12 text-center"><p className="text-gray-400">Nenhum plugin encontrado</p></GlassPanel>}
      {!isLoading && !error && activeTab==='packs' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{packs.map(p => <PackCard key={p.id} pack={p} />)}</div>}
      {!isLoading && !error && activeTab==='plugins' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{plugins.map(p => <PluginCard key={p.id} plugin={p} />)}</div>}
    </div>
  );
};
export default HubLayout;
