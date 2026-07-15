import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEditor } from '../../hooks/useEditor';
import { useEditorStore } from '../../store/editorSlice';
import Timeline from './Timeline';
import Preview from './Preview';
import ToolPanel from './ToolPanel';
import ExportPanel from './ExportPanel';

const EditorLayout = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { loadProject, isLoading, error } = useEditor();
  const showExport = useEditorStore((state) => state.showExport);

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-violet-400 text-lg">Carregando projeto...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-red-400 text-lg">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Preview />
          <Timeline />
        </div>
        <ToolPanel />
      </div>
      {showExport && <ExportPanel />}
    </div>
  );
};

export default EditorLayout;