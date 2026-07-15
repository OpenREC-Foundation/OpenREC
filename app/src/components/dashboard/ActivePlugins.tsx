import { Link } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';
import { usePlugins } from '../../hooks/usePlugins';

const ActivePlugins = () => {
  const { plugins, isLoading, error } = usePlugins();

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Plugins Ativos</h2>
        <Link
          to="/hub?tab=plugins"
          className="text-violet-400 hover:text-violet-300 text-sm"
        >
          Gerenciar
        </Link>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-white/5 animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-4">
          <p className="text-red-400 text-sm">Erro ao carregar plugins</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-violet-400 mt-1 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && !error && plugins.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">Nenhum plugin instalado</p>
          <Link
            to="/hub?tab=plugins"
            className="text-violet-400 text-xs mt-1 inline-block hover:underline"
          >
            Explorar plugins da comunidade
          </Link>
        </div>
      )}

      {!isLoading && !error && plugins.length > 0 && (
        <div className="space-y-3">
          {plugins.map((plugin) => (
            <div
              key={plugin.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex-1 mr-3">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{plugin.name}</p>
                  <span className="text-xs text-gray-500">por {plugin.author}</span>
                </div>
                <p className="text-xs text-gray-400">{plugin.description}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>★ {plugin.rating}</span>
                  <span>{plugin.downloads.toLocaleString()} downloads</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    plugin.enabled ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                />
                <Link
                  to={`/hub/plugin/${plugin.id}`}
                  className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  );
};

export default ActivePlugins;