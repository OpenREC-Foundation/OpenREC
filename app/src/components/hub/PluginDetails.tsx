import { useParams } from 'react-router-dom';
import { useHubPlugin } from '../../hooks/useHub';
import CreatorProfile from './CreatorProfile';
import Reviews from './Reviews';
import GlassPanel from '../ui/GlassPanel';

const PluginDetails = () => {
  const { pluginId } = useParams<{ pluginId: string }>();
  const { plugin, isLoading, error } = useHubPlugin(pluginId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-64 rounded-xl bg-white/5 animate-pulse" />
      </div>
    );
  }

  if (error || !plugin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-red-400">Plugin não encontrado</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <GlassPanel className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{plugin.name}</h1>
            <p className="text-gray-400 mt-1">por {plugin.author}</p>
            <p className="mt-4">{plugin.description}</p>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <span className="flex items-center gap-1 text-yellow-500">★ {plugin.rating}</span>
              <span className="text-gray-400">{plugin.downloads.toLocaleString()} downloads</span>
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${plugin.enabled ? 'bg-green-500' : 'bg-gray-600'}`} />
                {plugin.enabled ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <button className="mt-6 px-6 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors">
              Instalar Plugin
            </button>
          </div>
        </div>
      </GlassPanel>

      {plugin.permissions && plugin.permissions.length > 0 && (
        <GlassPanel className="p-6">
          <h2 className="text-lg font-semibold mb-3">Permissões solicitadas</h2>
          <ul className="space-y-2">
            {plugin.permissions.map((perm) => (
              <li key={perm} className="flex items-center gap-2 text-sm text-yellow-400">
                ⚠ {perm}
              </li>
            ))}
          </ul>
        </GlassPanel>
      )}

      <CreatorProfile creator={plugin.author} />

      <Reviews itemId={plugin.id} type="plugin" />
    </div>
  );
};

export default PluginDetails;