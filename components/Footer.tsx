import React from 'react';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { data } = useData();

  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {currentYear} {data.name}. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;