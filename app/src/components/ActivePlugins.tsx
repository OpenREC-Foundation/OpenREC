// components/dashboard/ActivePlugins.tsx
import { Link } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  enabled: boolean;
  rating: number;
  downloads: number;
}

const mockPlugins: Plugin[] = [
  {
    id: '1',
    name: 'YouTube Uploader',
    description: 'Exporta direto para o YouTube',
    author: 'devlucas',
    enabled: true,
    rating: 4.6,
    downloads: 890000,
  },
  {
    id: '2',
    name: 'Twitch Alerts',
    description: 'Notificações de chat ao vivo',
    author: 'streamtools',
    enabled: false,
    rating: 4.4,
    downloads: 650000,
  },
  {
    id: '3',
    name: 'Discord Status',
    description: 'Mostra o que está editando',
    author: 'communitylab',
    enabled: true,
    rating: 4.7,
    downloads: 1200000,
  },
];

const ActivePlugins = () => {
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
      <div className="space-y-3">
        {mockPlugins.map((plugin) => (
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
    </GlassPanel>
  );
};

export default ActivePlugins;