import { Link } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';

interface Project {
  id: string;
  name: string;
  thumbnail: string;
  lastModified: string;
  duration: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Vídeo do YouTube - Review',
    thumbnail: '/assets/images/placeholder-project.svg',
    lastModified: '2026-07-15',
    duration: '12:34',
  },
  {
    id: '2',
    name: 'Clipes da live',
    thumbnail: '/assets/images/placeholder-project.svg',
    lastModified: '2026-07-14',
    duration: '05:22',
  },
  {
    id: '3',
    name: 'Tutorial OpenREC',
    thumbnail: '/assets/images/placeholder-project.svg',
    lastModified: '2026-07-13',
    duration: '20:15',
  },
];

const RecentProjects = () => {
  return (
    <GlassPanel className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Projetos Recentes</h2>
        <Link
          to="/projects"
          className="text-violet-400 hover:text-violet-300 text-sm"
        >
          Ver todos
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map((project) => (
          <Link
            key={project.id}
            to={`/editor/${project.id}`}
            className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-violet-500/30"
          >
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-24 object-cover rounded-lg mb-3"
            />
            <h3 className="font-medium truncate">{project.name}</h3>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{project.lastModified}</span>
              <span>{project.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </GlassPanel>
  );
};

export default RecentProjects;