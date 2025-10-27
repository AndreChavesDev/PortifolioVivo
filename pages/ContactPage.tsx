import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';

const ContactPage: React.FC = () => {
  const { data, addMessage } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    setStatus('sending');
    
    // Simula o envio para um backend
    setTimeout(() => {
      try {
        addMessage({ name, email, message });
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } catch (error) {
        setStatus('error');
      }
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16">
        <section className="text-center">
            <motion.h1 
                className="text-4xl font-bold tracking-tight text-primary mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Entre em Contato
            </motion.h1>
            <motion.p 
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Tem uma pergunta ou um projeto em mente? Vamos conversar.
            </motion.p>
        </section>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Envie uma Mensagem</CardTitle>
                    <CardDescription>
                        Preencha o formulário abaixo e entrarei em contato em breve.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Mensagem</Label>
                            <Textarea id="message" placeholder="Sua mensagem..." value={message} onChange={e => setMessage(e.target.value)} required />
                        </div>
                        <Button type="submit" disabled={status === 'sending'} className="w-full">
                            {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                        </Button>
                        {status === 'success' && <p className="text-sm text-green-600 dark:text-green-400 text-center">Mensagem enviada com sucesso! (Visível no Dashboard)</p>}
                        {status === 'error' && <p className="text-sm text-destructive text-center">Ocorreu um erro ao enviar a mensagem.</p>}
                    </form>
                </CardContent>
            </Card>
        </motion.div>
        <div className="text-center text-muted-foreground">
            <p>Ou, entre em contato diretamente pelo email:</p>
            <a href={`mailto:${data.contact.email}`} className="text-primary hover:underline">
                {data.contact.email}
            </a>
        </div>
    </div>
  );
};

export default ContactPage;