import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block md:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground'
      }`
    }
  >
    {children}
  </NavLink>
);

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { data } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/about', label: 'Sobre' },
    { path: '/projects', label: 'Projetos' },
    { path: '/algorithms', label: 'Algoritmos' },
    { path: '/resume', label: 'Currículo' },
    { path: '/contact', label: 'Contato' },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-primary">
              {data.name}
            </NavLink>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavItem key={link.path} to={link.path}>{link.label}</NavItem>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <NavItem to="/admin/dashboard">Dashboard</NavItem>
                  <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">
                    Logout
                  </button>
                </>
              ) : (
                <NavItem to="/login">Login</NavItem>
              )}
              <ThemeToggle />
            </div>
            <div className="md:hidden ml-2 flex items-center">
               <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Abrir menu principal</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavItem key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>{link.label}</NavItem>
              ))}
              <div className="border-t border-border/40 my-2"></div>
                {isAuthenticated ? (
                  <>
                    <NavItem to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavItem>
                    <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground">
                        Logout
                    </button>
                  </>
                ) : (
                  <NavItem to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</NavItem>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;