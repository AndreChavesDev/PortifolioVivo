import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 30 30">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12c6.627,0,12-5.373,12-12C27,8.373,21.627,3,15,3z M15,25.5 c-5.799,0-10.5-4.701-10.5-10.5S9.201,4.5,15,4.5S25.5,9.201,25.5,15S20.799,25.5,15,25.5z M20.5,19.98c-0.126-0.273-0.457-0.453-0.81-0.638c-0.354-0.184-2.079-1.027-2.4-1.183c-0.322-0.156-0.555-0.247-0.787,0.247 c-0.232,0.494-0.91,1.183-1.116,1.416c-0.207,0.232-0.414,0.263-0.778,0.077c-0.364-0.186-1.54-0.569-2.93-1.808 c-1.08-0.96-1.81-2.14-2.02-2.5c-0.21-0.36-0.02-0.55,0.16-0.72c0.16-0.15,0.35-0.39,0.53-0.58c0.18-0.19,0.24-0.32,0.36-0.54 c0.12-0.22,0.06-0.41-0.03-0.58c-0.09-0.17-0.79-1.9-1.08-2.6c-0.29-0.7-0.58-0.6-0.79-0.6c-0.21,0-0.44,0-0.67,0 c-0.23,0-0.6,0.09-0.92,0.44c-0.32,0.35-1.23,1.2-1.23,2.9c0,1.7,1.26,3.4,1.44,3.6c0.18,0.2,2.46,3.9,6.01,5.3 c3.55,1.4,3.55,0.9,4.19,0.9c0.64,0,2.02-0.8,2.3-1.6c0.28-0.8,0.28-1.5,0.2-1.6C20.66,20.21,20.62,20.25,20.5,19.98z"></path>
  </svg>
);

const WhatsAppButton: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const message = encodeURIComponent("Olá! Encontrei seu portfólio e gostaria de entrar em contato.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] transition-colors"
      aria-label="Entrar em contato via WhatsApp"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppIcon className="w-8 h-8" />
    </motion.a>
  );
};

export default WhatsAppButton;