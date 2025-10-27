import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Project } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';

interface ProjectFormProps {
    project: Project | null;
    onClose: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
    const { addProject, updateProject } = useData();
    const [title, setTitle] = useState(project?.title || '');
    const [description, setDescription] = useState(project?.description || '');
    const [tags, setTags] = useState(project?.tags.join(', ') || '');
    const [imageUrl, setImageUrl] = useState(project?.imageUrl || 'https://picsum.photos/seed/new-project/600/400');
    const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
    const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const projectData = { 
            title, 
            description, 
            longDescription: description, 
            tags: tags.split(',').map(t => t.trim()), 
            imageUrl,
            githubUrl,
            liveUrl
        };
        if (project) {
            updateProject({ ...project, ...projectData });
        } else {
            addProject(projectData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>{project ? 'Editar Projeto' : 'Novo Projeto'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div><Label>Título</Label><Input value={title} onChange={e => setTitle(e.target.value)} required /></div>
                        <div><Label>Descrição</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} required /></div>
                        <div><Label>Tags (separadas por vírgula)</Label><Input value={tags} onChange={e => setTags(e.target.value)} /></div>
                        <div><Label>URL da Imagem</Label><Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} /></div>
                        <div><Label>URL do GitHub</Label><Input value={githubUrl} onChange={e => setGithubUrl(e.target.value)} /></div>
                        <div><Label>URL da Demonstração</Label><Input value={liveUrl} onChange={e => setLiveUrl(e.target.value)} /></div>
                        <div className="flex gap-2"><Button type="submit">Salvar</Button><Button type="button" variant="outline" onClick={onClose}>Cancelar</Button></div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
