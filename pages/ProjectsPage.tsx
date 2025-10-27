import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { Button } from '../components/ui/Button';
import { Project } from '../types';
import { ProjectForm } from '../components/ProjectForm';

const ProjectsPage: React.FC = () => {
  const { data, deleteProject } = useData();
  const { isAuthenticated } = useAuth();
  const { projects } = data;
  
  const allTags = useMemo(() => ['Todos', ...Array.from(new Set(projects.flatMap(p => p.tags)))], [projects]);
  const [activeFilter, setActiveFilter] = useState('Todos');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };
  
  const handleDelete = (projectId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
        deleteProject(projectId);
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') {
      return projects;
    }
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <div className="space-y-12">
      {isModalOpen && <ProjectForm project={currentProject} onClose={() => setIsModalOpen(false)} />}
      <section className="text-center">
        <motion.h1 
            className="text-4xl font-bold tracking-tight text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Meu Trabalho
        </motion.h1>
        <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            Uma coleção de projetos dos quais me orgulho.
        </motion.p>
      </section>

      <section>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={activeFilter === tag ? 'default' : 'outline'}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project: Project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard 
                    project={project} 
                    onEdit={isAuthenticated ? () => openModal(project) : undefined}
                    onDelete={isAuthenticated ? () => handleDelete(project.id) : undefined}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default ProjectsPage;