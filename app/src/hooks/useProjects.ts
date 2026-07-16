import { useState, useEffect } from 'react';
import type { Project } from '../types/project';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    setProjects([]);
    setIsLoading(false);
  }, []);

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const createProject = async (name: string) => {
    const p: Project = {
      id: Date.now().toString(),
      name,
      lastModified: new Date().toISOString(),
      duration: '0:00',
      created: new Date().toISOString(),
    };
    setProjects((prev) => [p, ...prev]);
    return p;
  };

  return { projects, isLoading, error, deleteProject, createProject };
};
