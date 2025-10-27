import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { Project, Algorithm } from '../types';
import { ProjectForm } from '../components/ProjectForm';


const AdminDashboardPage: React.FC = () => {
  const { data, setData, messages, addProject, updateProject, deleteProject, addAlgorithm, updateAlgorithm, deleteAlgorithm } = useData();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile state
  const [profileName, setProfileName] = useState(data.name);
  const [profileBio, setProfileBio] = useState(data.bio);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState(data.profileImageUrl);
  
  // Curriculum state
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState(data.resumeUrl);

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Algorithm Modal State
  const [isAlgorithmModalOpen, setIsAlgorithmModalOpen] = useState(false);
  const [currentAlgorithm, setCurrentAlgorithm] = useState<Algorithm | null>(null);


  const onProfileImageDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setProfileImage(acceptedFiles[0]);
      setProfileImageUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const { getRootProps: getProfileRootProps, getInputProps: getProfileInputProps } = useDropzone({
    onDrop: onProfileImageDrop,
    accept: { 'image/*': ['.jpeg', '.png'] }
  });

   const onResumeDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setResumeFile(acceptedFiles[0]);
      setResumeUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const { getRootProps: getResumeRootProps, getInputProps: getResumeInputProps } = useDropzone({
    onDrop: onResumeDrop,
    accept: { 'application/pdf': ['.pdf'] }
  });

  const handleProfileSave = () => {
    setData(prev => ({ ...prev, name: profileName, bio: profileBio, profileImageUrl }));
    alert('Perfil salvo! (Simulado)');
  };

  const handleResumeSave = () => {
    setData(prev => ({ ...prev, resumeUrl }));
    alert('Currículo salvo! (Simulado)');
  };

  const openProjectModal = (project: Project | null) => {
    setCurrentProject(project);
    setIsProjectModalOpen(true);
  };

  const openAlgorithmModal = (algorithm: Algorithm | null) => {
    setCurrentAlgorithm(algorithm);
    setIsAlgorithmModalOpen(true);
  };
  
  // Algorithm Form Component
    const AlgorithmForm = ({ algorithm, onClose }: { algorithm: Algorithm | null, onClose: () => void}) => {
    const [name, setName] = useState(algorithm?.name || '');
    const [description, setDescription] = useState(algorithm?.description || '');
    const [language, setLanguage] = useState(algorithm?.language || 'javascript');
    const [codeSnippet, setCodeSnippet] = useState(algorithm?.codeSnippet || '');

    const handleAlgorithmSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const algorithmData = { name, description, language, codeSnippet };
        if (algorithm) {
            updateAlgorithm({ ...algorithm, ...algorithmData });
        } else {
            addAlgorithm(algorithmData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>{algorithm ? 'Editar Algoritmo' : 'Novo Algoritmo'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAlgorithmSubmit} className="space-y-4">
                        <div><Label>Nome</Label><Input value={name} onChange={e => setName(e.target.value)} required /></div>
                        <div><Label>Linguagem</Label><Input value={language} onChange={e => setLanguage(e.target.value)} required /></div>
                        <div><Label>Descrição</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} required /></div>
                        <div><Label>Snippet de Código</Label><Textarea value={codeSnippet} onChange={e => setCodeSnippet(e.target.value)} required rows={8} className="font-mono"/></div>
                        <div className="flex gap-2"><Button type="submit">Salvar</Button><Button variant="outline" onClick={onClose}>Cancelar</Button></div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
  };


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <h1 className="text-3xl font-bold">Painel de Administração</h1>
      
      {isProjectModalOpen && <ProjectForm project={currentProject} onClose={() => setIsProjectModalOpen(false)} />}
      {isAlgorithmModalOpen && <AlgorithmForm algorithm={currentAlgorithm} onClose={() => setIsAlgorithmModalOpen(false)} />}

      <Tabs>
        <TabsList>
          <TabsTrigger onClick={() => setActiveTab('profile')} active={activeTab === 'profile'}>Perfil</TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab('curriculum')} active={activeTab === 'curriculum'}>Currículo</TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab('projects')} active={activeTab === 'projects'}>Projetos</TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab('algorithms')} active={activeTab === 'algorithms'}>Algoritmos</TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab('messages')} active={activeTab === 'messages'}>Mensagens</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent style={{ display: activeTab === 'profile' ? 'block' : 'none' }}>
            <Card><CardHeader><CardTitle>Gerenciamento de Perfil</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                  <Label>Nome</Label>
                  <Input value={profileName} onChange={e => setProfileName(e.target.value)} />
                </div>
                <div>
                  <Label>Bio Curta (Página Inicial)</Label>
                  <Textarea value={profileBio} onChange={e => setProfileBio(e.target.value)} />
                </div>
                <div>
                    <Label>Foto de Perfil</Label>
                    <div {...getProfileRootProps()} className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary">
                        <input {...getProfileInputProps()} />
                        <p>Arraste e solte uma imagem aqui, ou clique para selecionar.</p>
                    </div>
                    {profileImageUrl && <img src={profileImageUrl} alt="Preview" className="mt-4 h-24 w-24 rounded-full object-cover"/>}
                </div>
                <Button onClick={handleProfileSave}>Salvar Perfil</Button>
            </CardContent></Card>
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent style={{ display: activeTab === 'curriculum' ? 'block' : 'none' }}>
           <Card><CardHeader><CardTitle>Gerenciamento de Currículo</CardTitle></CardHeader>
           <CardContent className="space-y-4">
               <div>
                    <Label>Arquivo PDF do Currículo</Label>
                    <div {...getResumeRootProps()} className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary">
                        <input {...getResumeInputProps()} />
                        <p>Arraste e solte um PDF aqui, ou clique para selecionar.</p>
                    </div>
                    {resumeFile && <p className="mt-2 text-sm">Arquivo selecionado: {resumeFile.name}</p>}
                </div>
                <Button onClick={handleResumeSave}>Salvar Currículo</Button>
            </CardContent></Card>
        </TabsContent>
        
        {/* Projects Tab */}
        <TabsContent style={{ display: activeTab === 'projects' ? 'block' : 'none' }}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Gerenciamento de Projetos</CardTitle>
                    <Button onClick={() => openProjectModal(null)}>Adicionar Projeto</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.projects.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-2 border rounded-md">
                            <span>{p.title}</span>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" onClick={() => openProjectModal(p)}>Editar</Button>
                                <Button variant="destructive" size="sm" onClick={() => window.confirm('Tem certeza?') && deleteProject(p.id)}>Excluir</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

        {/* Algorithms Tab */}
        <TabsContent style={{ display: activeTab === 'algorithms' ? 'block' : 'none' }}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Gerenciamento de Algoritmos</CardTitle>
                    <Button onClick={() => openAlgorithmModal(null)}>Adicionar Algoritmo</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.algorithms.map(a => (
                        <div key={a.id} className="flex items-center justify-between p-2 border rounded-md">
                            <span>{a.name}</span>
                            <div className="space-x-2">
                                <Button variant="outline" size="sm" onClick={() => openAlgorithmModal(a)}>Editar</Button>
                                <Button variant="destructive" size="sm" onClick={() => window.confirm('Tem certeza?') && deleteAlgorithm(a.id)}>Excluir</Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent style={{ display: activeTab === 'messages' ? 'block' : 'none' }}>
            <Card><CardHeader><CardTitle>Mensagens Recebidas</CardTitle><CardDescription>Mensagens enviadas através do formulário de contato.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
                {messages.length === 0 ? <p>Nenhuma mensagem ainda.</p> :
                 messages.map(msg => (
                    <div key={msg.id} className="border p-4 rounded-md">
                        <p><strong>De:</strong> {msg.name} ({msg.email})</p>
                        <p className="mt-2">{msg.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">{msg.sentAt.toLocaleString()}</p>
                    </div>
                 ))
                }
            </CardContent></Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminDashboardPage;