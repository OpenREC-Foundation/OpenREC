import { Link } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';
import { usePacks } from '../../hooks/usePacks';

const InstalledPacks = () => {
  const { packs, isLoading, error } = usePacks();

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Packs Instalados</h2>
        <Link
          to="/hub?tab=packs"
          className="text-violet-400 hover:text-violet-300 text-sm"
        >
          Explorar mais
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
          <p className="text-red-400 text-sm">Erro ao carregar packs</p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-violet-400 mt-1 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && !error && packs.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm">Nenhum pack instalado</p>
          <Link
            to="/hub?tab=packs"
            className="text-violet-400 text-xs mt-1 inline-block hover:underline"
          >
            Explorar packs da comunidade
          </Link>
        </div>
      )}

      {!isLoading && !error && packs.length > 0 && (
        <div className="space-y-3">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{pack.icon}</span>
                <div>
                  <p className="font-medium">{pack.name}</p>
                  <p className="text-xs text-gray-400">
                    por {pack.author} • ★ {pack.rating} • {pack.downloads.toLocaleString()} downloads
                  </p>
                </div>
              </div>
              <Link
                to={`/hub/pack/${pack.id}`}
                className="text-xs px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors"
              >
                Ver pack
              </Link>
            </div>
          ))}
        </div>
      )}
    </GlassPanel>
  );
};

export default InstalledPacks;