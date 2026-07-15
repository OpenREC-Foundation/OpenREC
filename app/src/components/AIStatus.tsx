import GlassPanel from '../ui/GlassPanel';
import ProgressBar from '../ui/ProgressBar';

const AIStatus = () => {
  const isProcessing = true;
  const progress = 67;
  const task = 'Analisando projeto "Review"';

  return (
    <GlassPanel className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-violet-500 animate-pulse" />
        <h2 className="text-xl font-semibold">OpenREC AI</h2>
      </div>
      {isProcessing ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-300">{task}</p>
          <ProgressBar value={progress} max={100} />
          <p className="text-xs text-gray-500">{progress}% concluído</p>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Nenhuma tarefa em andamento</p>
      )}
    </GlassPanel>
  );
};

export default AIStatus;