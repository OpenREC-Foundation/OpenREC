import GlassPanel from '../ui/GlassPanel';
import ProgressBar from '../ui/ProgressBar';

const StorageUsage = () => {
  const usedGB = 45.2;
  const totalGB = 100;
  const percentage = Math.round((usedGB / totalGB) * 100);

  return (
    <GlassPanel className="p-6">
      <h2 className="text-xl font-semibold mb-4">Espaço Usado</h2>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold">{usedGB} GB</span>
        <span className="text-gray-400 text-sm mb-1">/ {totalGB} GB</span>
      </div>
      <ProgressBar value={percentage} max={100} className="mt-2" />
      <p className="text-xs text-gray-500 mt-2">{percentage}% utilizado</p>
    </GlassPanel>
  );
};

export default StorageUsage;