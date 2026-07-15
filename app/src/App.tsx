import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Recorder from './pages/Recorder';
import Hub from './pages/Hub';
import Settings from './pages/Settings';
import ProjectDetails from './pages/ProjectDetails';
import PackDetails from './components/hub/PackDetails';
import PluginDetails from './components/hub/PluginDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/editor/:projectId" element={<Editor />} />
        <Route path="/recorder" element={<Recorder />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/hub/pack/:packId" element={<PackDetails />} />
        <Route path="/hub/plugin/:pluginId" element={<PluginDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
