import { Link } from 'react-router-dom';
import type { Pack } from '../../types/pack';

interface Props {
  pack: Pack;
}

const PackCard = ({ pack }: Props) => {
  return (
    <Link
      to={`/hub/pack/${pack.id}`}
      className="block p-4 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{pack.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{pack.name}</h3>
          <p className="text-xs text-gray-400 mt-1">por {pack.author}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          ★ <span className="text-gray-300">{pack.rating}</span>
        </div>
        <span className="text-xs text-gray-500">{pack.downloads.toLocaleString()} downloads</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {pack.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default PackCard;