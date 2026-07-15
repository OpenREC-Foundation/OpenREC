import { useParams } from 'react-router-dom';
import { useHubPack } from '../../hooks/useHub';
import CreatorProfile from './CreatorProfile';
import Reviews from './Reviews';
import GlassPanel from '../ui/GlassPanel';

const PackDetails = () => {
  const { packId } = useParams<{ packId: string }>();
  const { pack, isLoading, error } = useHubPack(packId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-64 rounded-xl bg-white/5 animate-pulse" />
      </div>
    );
  }

  if (error || !pack) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-red-400">Pack não encontrado</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <GlassPanel className="p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl">{pack.icon}</span>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{pack.name}</h1>
            <p className="text-gray-400 mt-1">por {pack.author}</p>
            <p className="mt-4">{pack.description}</p>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <span className="flex items-center gap-1 text-yellow-500">★ {pack.rating}</span>
              <span className="text-gray-400">{pack.downloads.toLocaleString()} downloads</span>
              <span className="text-gray-400">v{pack.version}</span>
            </div>
            <button className="mt-6 px-6 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors">
              Instalar Pack
            </button>
          </div>
        </div>
      </GlassPanel>

      <CreatorProfile creator={pack.author} />

      <Reviews itemId={pack.id} type="pack" />
    </div>
  );
};

export default PackDetails;