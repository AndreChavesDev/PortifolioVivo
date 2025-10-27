import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Transition } from 'framer-motion';

import { ThemeProvider, useTheme } from './hooks/useTheme';
import { DataProvider, useData } from './context/DataContext'; // Data context for mock DB
import { AuthProvider } from './context/AuthContext'; // Auth context

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AnimatedCursor from './components/AnimatedCursor';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
        {children}
    </motion.div>
);

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
                <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
                <Route path="/projects" element={<AnimatedPage><ProjectsPage /></AnimatedPage>} />
                <Route path="/algorithms" element={<AnimatedPage><AlgorithmsPage /></AnimatedPage>} />
                <Route path="/resume" element={<AnimatedPage><ResumePage /></AnimatedPage>} />
                <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
                <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AnimatedPage><AdminDashboardPage /></AnimatedPage>
                    </ProtectedRoute>
                  } 
                />
            </Routes>
        </AnimatePresence>
    );
};

const AppContent: React.FC = () => {
    const { theme } = useTheme();
    const { data } = useData();

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatedRoutes />
            </main>
            <Footer />
            <WhatsAppButton phoneNumber={data.contact.whatsappNumber} />
            <AnimatedCursor />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DataProvider>
          <AppContent />
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;