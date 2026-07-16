import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import GlassPanel from '../components/ui/GlassPanel';
import Button from '../components/ui/Button';

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(false);
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
        <Link to="/projects" className="text-violet-400 hover:underline">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <GlassPanel className="p-6">
        <h1 className="text-2xl font-bold">Projeto {projectId}</h1>
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
