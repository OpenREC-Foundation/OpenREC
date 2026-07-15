import { useHubCreator } from '../../hooks/useHub';
import GlassPanel from '../ui/GlassPanel';

interface Props {
  creator: string;
}

const CreatorProfile = ({ creator }: Props) => {
  const { profile, isLoading } = useHubCreator(creator);

  if (isLoading) {
    return (
      <GlassPanel className="p-6">
        <div className="h-20 bg-white/5 rounded-lg animate-pulse" />
      </GlassPanel>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <GlassPanel className="p-6">
      <h2 className="text-lg font-semibold mb-3">Sobre o criador</h2>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-xl font-bold text-violet-300">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm text-gray-400">{profile.packsCount} packs • {profile.pluginsCount} plugins</p>
        </div>
      </div>
      {profile.bio && <p className="mt-3 text-sm text-gray-300">{profile.bio}</p>}
    </GlassPanel>
  );
};

export default CreatorProfile;