import RecentProjects from '../components/dashboard/RecentProjects';
import StorageUsage from '../components/dashboard/StorageUsage';
import AIStatus from '../components/dashboard/AIStatus';
import InstalledPacks from '../components/dashboard/InstalledPacks';
import ActivePlugins from '../components/dashboard/ActivePlugins';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentProjects />
        </div>
        <StorageUsage />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIStatus />
        <div className="space-y-6">
          <InstalledPacks />
          <ActivePlugins />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
