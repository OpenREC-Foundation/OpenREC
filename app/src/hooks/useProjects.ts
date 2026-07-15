import { useState, useEffect } from 'react';
import type { Project } from '../types/project';
import { storageService } from '../services/storage';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // const response = await storageService.listProjects();
        // setProjects(response.data);
        setProjects([]);
      } catch (err) {
        setError('Erro ao carregar projetos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const deleteProject = async (projectId: string) => {
    try {
      await storageService.deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createProject = async (name: string) => {
    try {
      const project = await storageService.createProject(name);
      setProjects((prev) => [project, ...prev]);
      return project;
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return { projects, isLoading, error, deleteProject, createProject };
};
