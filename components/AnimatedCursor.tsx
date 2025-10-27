import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const AnimatedCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const dx = useSpring(mousePosition.x - 20, springConfig);
  const dy = useSpring(mousePosition.y - 20, springConfig);


  return (
    <motion.div
      className="animated-cursor"
      style={{
        translateX: dx,
        translateY: dy,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-12">
        <circle cx="20" cy="20" r="18" stroke="hsl(var(--primary))" strokeWidth="2"/>
        <circle cx="15" cy="17" r="2" fill="hsl(var(--primary))"/>
        <circle cx="25" cy="17" r="2" fill="hsl(var(--primary))"/>
        <path d="M15 25 Q 20 28, 25 25" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
};

export default AnimatedCursor;