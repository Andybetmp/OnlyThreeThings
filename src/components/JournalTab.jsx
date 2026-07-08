import React from 'react';
import { motion } from 'framer-motion';

export default function JournalTab({ history }) {
  const dates = Object.keys(history).sort((a, b) => new Date(b) - new Date(a));

  const formatDate = (dateStr) => {
    try {
      const parts = dateStr.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2]);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (dates.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-grow flex flex-col items-center justify-center text-center p-lg py-xl max-w-[420px] mx-auto"
      >
        <div className="w-20 h-20 rounded-full bg-surface-container dark:bg-white/5 flex items-center justify-center text-on-surface-variant mb-md">
          <span className="material-symbols-outlined text-[40px]">auto_stories</span>
        </div>
        <h2 className="font-headline-md text-on-surface mb-sm font-semibold">Tu Diario está vacío</h2>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          Completa tus tres prioridades diarias. Cuando termine el día y empiece uno nuevo, tus logros se guardarán aquí automáticamente.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-container-max mx-auto px-gutter py-md flex flex-col gap-lg"
    >
      <div className="mb-md">
        <h1 className="font-display text-display text-[#3a4133] dark:text-[#dde6d0] font-semibold">Tu Historial</h1>
        <p className="font-body-lg text-on-surface-variant dark:text-neutral-400">Un registro de tus días enfocados.</p>
      </div>

      <div className="flex flex-col gap-lg">
        {dates.map((dateStr) => {
          const dayTasks = history[dateStr];
          return (
            <motion.div 
              key={dateStr}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container-lowest dark:bg-surface-container rounded-xl p-md shadow-ambient border border-outline-variant/30"
            >
              <h3 className="font-headline-md text-[#3a4133] dark:text-[#dde6d0] capitalize mb-sm font-semibold">
                {formatDate(dateStr)}
              </h3>
              
              <ul className="flex flex-col gap-xs">
                {dayTasks.map((taskText, idx) => (
                  <li key={idx} className="flex items-center gap-sm py-xs text-body-md text-on-surface">
                    <span className="material-symbols-outlined text-primary dark:text-[#dde6d0] filled-icon text-[20px]">
                      check_circle
                    </span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300 line-through">
                      {taskText}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
