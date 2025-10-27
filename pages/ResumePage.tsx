import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Button } from '../components/ui/Button';

const ResumePage: React.FC = () => {
  const { data } = useData();
  const { resumeUrl } = data;

  return (
    <div className="space-y-12">
      <section className="text-center">
        <motion.h1 
            className="text-4xl font-bold tracking-tight text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Meu Currículo
        </motion.h1>
        <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            Aqui está minha trajetória profissional em resumo.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <a href={resumeUrl} download="curriculo-andre-cruz.pdf">
                <Button size="lg">Baixar PDF</Button>
            </a>
        </motion.div>
      </section>

      <motion.section
        className="w-full h-[80vh] bg-card p-2 rounded-lg shadow-inner border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <iframe
          src={resumeUrl}
          title="Currículo"
          className="w-full h-full rounded"
          width="100%"
          height="100%"
        />
      </section>
    </div>
  );
};

export default ResumePage;