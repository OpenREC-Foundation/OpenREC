import { Link } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';

interface Pack {
  id: string;
  name: string;
  version: string;
  icon: string;
}

const mockPacks: Pack[] = [
  { id: '1', name: 'Gaming Extreme', version: '1.2.0', icon: '🎮' },
  { id: '2', name: 'Cinematic', version: '2.0.1', icon: '🎬' },
  { id: '3', name: 'Shorts', version: '1.5.0', icon: '📱' },
];

const InstalledPacks = () => {
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
      <div className="space-y-3">
        {mockPacks.map((pack) => (
          <div
            key={pack.id}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{pack.icon}</span>
              <div>
                <p className="font-medium">{pack.name}</p>
                <p className="text-xs text-gray-400">v{pack.version}</p>
              </div>
            </div>
            <button className="text-xs px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors">
              Ativo
            </button>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export default InstalledPacks;