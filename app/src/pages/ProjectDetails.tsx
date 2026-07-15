import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { engineService } from '../services/engine';
import GlassPanel from '../components/ui/GlassPanel';
import Button from '../components/ui/Button';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;
    const load = async () => {
      try {
        setIsLoading(true);
        // const data = await engineService.loadProject(projectId);
        // setProject(data);
        setProject(null);
      } catch (err: any) {
        setError(err.message || 'Projeto não encontrado');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <p className="text-gray-400">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-950 gap-4">
        <p className="text-red-400">{error}</p>
        <Link to="/projects" className="text-violet-400 hover:underline">Voltar para projetos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <GlassPanel className="p-6">
        <h1 className="text-2xl font-bold">{project?.name || 'Projeto sem nome'}</h1>
        <p className="text-gray-400 mt-2">Última modificação: {project?.lastModified}</p>
        <div className="mt-4 flex gap-3">
          <Link to={`/editor/${projectId}`}>
            <Button>Abrir no Editor</Button>
          </Link>
          <Button variant="secondary">Renomear</Button>
          <Button variant="danger">Excluir</Button>
        </div>
      </GlassPanel>
    </div>
  );
};

export default ProjectDetails;
