import { Link } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';

interface Plugin {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const mockPlugins: Plugin[] = [
  {
    id: '1',
    name: 'YouTube Uploader',
    description: 'Exporta direto para o YouTube',
    enabled: true,
  },
  {
    id: '2',
    name: 'Twitch Alerts',
    description: 'Notificações de chat ao vivo',
    enabled: false,
  },
  {
    id: '3',
    name: 'Discord Status',
    description: 'Mostra o que está editando',
    enabled: true,
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
              <p className="font-medium">{plugin.name}</p>
              <p className="text-xs text-gray-400">{plugin.description}</p>
            </div>
            <div
              className={`w-2 h-2 rounded-full ${
                plugin.enabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            />
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default ActivePlugins;