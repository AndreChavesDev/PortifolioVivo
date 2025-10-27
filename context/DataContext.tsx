import React, { createContext, useContext, useState } from 'react';
import { PortfolioData, DataContextType, Project, Algorithm, Message } from '../types';
import { portfolioData as initialData } from '../data/portfolioData';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [messages, setMessages] = useState<Message[]>([]);

  // Funções para simular CRUD no backend
  const addMessage = (message: Omit<Message, 'id' | 'sentAt'>) => {
    const newMessage: Message = {
      ...message,
      id: new Date().toISOString(),
      sentAt: new Date(),
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const updateProject = (updatedProject: Project) => {
     setData(prev => ({
        ...prev,
        projects: prev.projects.map(p => p.id === updatedProject.id ? updatedProject : p)
     }));
  };
  
  const deleteProject = (projectId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  const addAlgorithm = (algorithm: Omit<Algorithm, 'id'>) => {
    const newAlgorithm: Algorithm = {
        ...algorithm,
        id: new Date().toISOString(),
    };
    setData(prev => ({ ...prev, algorithms: [newAlgorithm, ...prev.algorithms] }));
  };

  const updateAlgorithm = (updatedAlgorithm: Algorithm) => {
      setData(prev => ({
          ...prev,
          algorithms: prev.algorithms.map(a => a.id === updatedAlgorithm.id ? updatedAlgorithm : a)
      }));
  };

  const deleteAlgorithm = (algorithmId: string) => {
      setData(prev => ({
          ...prev,
          algorithms: prev.algorithms.filter(a => a.id !== algorithmId)
      }));
  };


  return (
    <DataContext.Provider value={{ 
        data, 
        setData, 
        messages, 
        addMessage, 
        addProject,
        updateProject,
        deleteProject,
        addAlgorithm,
        updateAlgorithm,
        deleteAlgorithm
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};