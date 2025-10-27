import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const AboutPage: React.FC = () => {
  const { data } = useData();
  const { name, about, experience, profileImageUrl } = data;

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <section className="text-center">
        <motion.h1 
            className="text-4xl font-bold tracking-tight text-primary mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            Sobre Mim
        </motion.h1>
        <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            Um pouco sobre minha jornada e o que eu faço.
        </motion.p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <motion.div 
            className="md:col-span-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
              <img src={profileImageUrl} alt={name} className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover shadow-lg border-4 border-primary/20" />
          </motion.div>
          <motion.div 
            className="md:col-span-2 space-y-4 text-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
              <p>{about.long}</p>
          </motion.div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Minha Jornada</h2>
        <div className="relative border-l-2 border-primary/20 ml-4">
          {experience.map((item, index) => (
            <motion.div
              key={index}
              className="mb-10 ml-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <span className="absolute flex items-center justify-center w-8 h-8 bg-primary rounded-full -left-4 ring-8 ring-background">
                <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-foreground">
                {item.title}
                <span className="bg-secondary text-secondary-foreground text-sm font-medium ml-3 px-2.5 py-0.5 rounded-full">{item.year}</span>
              </h3>
              <p className="block mb-2 text-sm font-normal leading-none text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;