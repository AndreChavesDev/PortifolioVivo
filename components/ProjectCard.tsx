import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Button } from './ui/Button';

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const isAdmin = onEdit && onDelete;

  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
        <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-xl relative">
            {isAdmin && (
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                    <Button size="sm" variant="outline" onClick={onEdit}>Editar</Button>
                    <Button size="sm" variant="destructive" onClick={onDelete}>Excluir</Button>
                </div>
            )}
            <div className="aspect-video overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {tag}
                    </span>
                ))}
                </div>
            </CardContent>
            <CardFooter className="space-x-2">
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">GitHub</Button>
                    </a>
                )}
                {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Button>Demonstração</Button>
                    </a>
                )}
            </CardFooter>
        </Card>
    </motion.div>
  );
};

export default ProjectCard;