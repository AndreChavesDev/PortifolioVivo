import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import { Button } from '../components/ui/Button';
import { ProjectForm } from '../components/ProjectForm';
import { Project } from '../types';

const HomePage: React.FC = () => {
  const { data, deleteProject } = useData();
  const { isAuthenticated } = useAuth();
  const { name, title, bio, skills, projects } = data;
  const recentProjects = projects.slice(0, 3);
  
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


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="space-y-16">
      {isModalOpen && <ProjectForm project={currentProject} onClose={() => setIsModalOpen(false)} />}
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.p>
        <motion.p
          className="max-w-2xl mx-auto text-lg text-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {bio}
        </motion.p>
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/contact">
            <Button size="lg">Entre em Contato</Button>
          </Link>
          <Link to="/projects">
            <Button size="lg" variant="secondary">Veja meu Trabalho</Button>
          </Link>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Minhas Tecnologias</h2>
        <motion.div
          className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-card border rounded-full px-4 py-2 text-card-foreground shadow-sm"
              variants={item}
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Recent Projects Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Projetos Recentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onEdit={isAuthenticated ? () => openModal(project) : undefined}
                onDelete={isAuthenticated ? () => handleDelete(project.id) : undefined}
              />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/projects">
                <Button variant="outline" size="lg">Ver Todos os Projetos</Button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;