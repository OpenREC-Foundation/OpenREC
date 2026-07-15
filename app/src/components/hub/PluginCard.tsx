import { Link } from 'react-router-dom';
import type { Plugin } from '../../types/plugin';

interface Props {
  plugin: Plugin;
}

const PluginCard = ({ plugin }: Props) => {
  return (
    <Link
      to={`/hub/plugin/${plugin.id}`}
      className="block p-4 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/30 hover:bg-white/10 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{plugin.name}</h3>
          <p className="text-xs text-gray-400 mt-1">por {plugin.author}</p>
        </div>
        <div className={`w-2 h-2 rounded-full mt-1.5 ${plugin.enabled ? 'bg-green-500' : 'bg-gray-600'}`} />
      </div>
      <p className="text-sm text-gray-400 mt-2 line-clamp-2">{plugin.description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          ★ <span className="text-gray-300">{plugin.rating}</span>
        </div>
        <span className="text-xs text-gray-500">{plugin.downloads.toLocaleString()} downloads</span>
      </div>
    </Link>
  );
};

export default PluginCard;