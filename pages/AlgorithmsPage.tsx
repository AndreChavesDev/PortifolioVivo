import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import CodeBlock from '../components/CodeBlock';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const AlgorithmsPage: React.FC = () => {
  const { data } = useData();
  const { algorithms } = data;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <motion.h1 
            className="text-4xl font-bold tracking-tight text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Estudo de Algoritmos
        </motion.h1>
        <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            Uma coleção de algoritmos que implementei para estudo e prática.
        </motion.p>
      </section>

      <section className="max-w-4xl mx-auto space-y-6">
        {algorithms.map((alg, index) => (
          <motion.div
            key={alg.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{alg.name}</CardTitle>
                    <CardDescription>{alg.description}</CardDescription>
                  </div>
                   <Button variant="outline" size="sm" onClick={() => setExpandedId(expandedId === alg.id ? null : alg.id)}>
                    {expandedId === alg.id ? 'Fechar' : 'Ver Código'}
                  </Button>
                </div>
              </CardHeader>
              {expandedId === alg.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent>
                      <CodeBlock code={alg.codeSnippet} language={alg.language} />
                    </CardContent>
                  </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default AlgorithmsPage;