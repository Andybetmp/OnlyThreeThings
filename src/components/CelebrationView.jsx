import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const positivePhrases = [
  "Hoy fue un buen día. Completaste tus 3 prioridades.",
  "¡Excelente trabajo! Todo lo importante está hecho.",
  "Un día de enfoque impecable. Disfruta tu descanso.",
  "Prioridades completadas. Tiempo de recargar energías."
];

export default function CelebrationView({ onBackToDashboard }) {
  const [phrase, setPhrase] = useState('');
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    // Pick a random phrase once on mount
    const randomPhrase = positivePhrases[Math.floor(Math.random() * positivePhrases.length)];
    setPhrase(randomPhrase);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-md overflow-hidden relative min-h-[600px] w-full">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-surface to-primary-fixed/20 dark:from-surface-dim dark:to-primary-fixed/5 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-gradient-to-tl from-secondary-fixed/30 to-transparent dark:from-secondary-fixed-dim/10 rounded-full blur-[100px] opacity-40"></div>
      </div>

      <main className="w-full max-w-container-max mx-auto flex flex-col items-center justify-center text-center z-10 space-y-lg px-gutter">
        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-sm"
        >
          <h1 className="font-display text-display text-primary dark:text-primary-fixed-dim tracking-tight">
            Hoy fue un buen día
          </h1>
          <p className="font-body-lg text-body-lg text-outline dark:text-outline-variant">
            {phrase}
          </p>
        </motion.div>

        {/* Center Illustration with floating animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0]
          }}
          transition={{ 
            scale: { delay: 0.4, duration: 0.8 },
            opacity: { delay: 0.4, duration: 0.8 },
            y: {
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }
          }}
          className="w-full max-w-[320px] aspect-square rounded-full flex items-center justify-center relative"
        >
          <div className="absolute inset-0 bg-white/50 dark:bg-white/5 rounded-full blur-2xl z-0"></div>
          <img 
            alt="Minimalist line art illustration of a peaceful plant sunrise" 
            className="w-full h-full object-cover rounded-full z-10 ambient-glow border border-surface-variant/30 dark:border-outline-variant/30" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzZX9mzAadN_LO09n2tbBU7v83AqbwmMhQClFr_KOLr_4BECxN7oBYvjFLdUMqSxgsB_kRjrwPYubSV7LB9IvT_IjFWA9wFUGR-LS4dkHf-tUhpVu8Vl7Hi1XqfaZtQtrB7_7gw285uBywslyNe70vSLMNADAU5cZRigJsvzhUyjhgjWGAIreYrdB_nESFJLCchbMJNhAnw8Owvns2ofDdglFdvBye23KVEu40PHlDInUxE--7EKQU8D-mB1I3QNpRn3zn2qccJ6VA"
          />
        </motion.div>

        {/* Actions buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-md justify-center items-center mt-xl"
        >
          <button 
            onClick={() => setIsResting(true)}
            className="bg-primary text-on-primary font-label-lg text-label-lg px-xl py-sm min-h-[56px] rounded-full hover:bg-opacity-95 transition-all duration-300 ambient-glow active:scale-95 flex items-center justify-center gap-2 shadow-ambient pressed-state"
          >
            <span className="material-symbols-outlined">bedtime</span>
            Descansar
          </button>
          
          <button 
            onClick={onBackToDashboard}
            className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim font-label-lg text-label-lg px-lg py-sm rounded-full hover:bg-surface-container transition-all"
          >
            Ver mis tareas
          </button>
        </motion.div>
      </main>

      {/* Rest Overlay Screen (Night sky mode) */}
      <AnimatePresence>
        {isResting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0c0f1d] text-white flex flex-col justify-center items-center p-md"
          >
            {/* Stars background elements */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-[10%] left-[70%] w-1.5 h-1.5 bg-white/80 rounded-full"></div>
              <div className="absolute top-[40%] left-[80%] w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-[75%] left-[60%] w-2 h-2 bg-white/70 rounded-full"></div>
            </div>

            <motion.div 
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="text-center max-w-[420px] flex flex-col items-center"
            >
              <span className="material-symbols-outlined text-[64px] text-yellow-200 mb-md animate-pulse">
                nights_stay
              </span>
              <h2 className="font-display text-headline-lg font-bold mb-sm text-yellow-100">
                Que descanses
              </h2>
              <p className="font-body-lg text-gray-400 mb-xl">
                Hoy diste lo mejor de ti al concentrarte en lo esencial. Mañana será otro gran día.
              </p>
              <button 
                onClick={() => setIsResting(false)}
                className="px-xl py-sm bg-white/10 text-white border border-white/20 hover:bg-white/20 active:scale-95 transition-all font-label-lg rounded-full"
              >
                Volver
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
