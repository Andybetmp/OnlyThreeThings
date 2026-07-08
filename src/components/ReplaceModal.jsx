import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReplaceModal({ isOpen, currentTasks, newTaskText, onSelectReplace, onCancel }) {
  if (!isOpen) return null;

  // Icon mapping based on task index to mimic the design
  const getIcon = (index) => {
    switch (index) {
      case 0: return 'self_improvement';
      case 1: return 'edit_note';
      case 2: return 'menu_book';
      default: return 'task_alt';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-gutter bg-surface-variant/30 dark:bg-black/40 backdrop-blur-md transition-all duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ cubicBezier: [0.2, 0.8, 0.2, 1], duration: 0.4 }}
          className="bg-surface-container-lowest dark:bg-surface-container w-full max-w-[500px] rounded-[2rem] p-lg shadow-[0_30px_60px_-15px_rgba(89,97,80,0.12)] flex flex-col items-center border border-outline-variant/30"
        >
          {/* Header */}
          <div className="text-center mb-xl w-full">
            <span className="material-symbols-outlined text-[#3a4133] dark:text-[#dde6d0] text-4xl mb-sm inline-block bg-[#b8c1ac]/50 dark:bg-[#596150]/40 p-sm rounded-full">
              swap_horiz
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface dark:text-neutral-100 font-bold leading-tight">
              ¿Qué prioridad quieres reemplazar?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant dark:text-neutral-400 mt-xs">
              Elige una de tus tareas actuales para dejar espacio a:
              <br />
              <strong className="text-[#3a4133] dark:text-[#dde6d0] font-bold">"{newTaskText}"</strong>
            </p>
          </div>

          {/* Options List */}
          <div className="w-full flex flex-col gap-md mb-xl">
            {currentTasks.map((task, index) => (
              <button
                key={task ? task.id : index}
                disabled={!task}
                onClick={() => onSelectReplace(index, newTaskText)}
                className="w-full text-left bg-surface dark:bg-surface-dim hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-all duration-300 rounded-lg p-md border border-outline-variant/30 flex items-center justify-between group pressed-state"
              >
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed/30 dark:bg-primary-fixed-dim/20 flex items-center justify-center text-[#3a4133] dark:text-[#dde6d0] group-hover:bg-primary-fixed dark:group-hover:bg-primary-fixed-dim group-hover:text-on-primary-fixed transition-colors">
                    <span className="material-symbols-outlined">
                      {getIcon(index)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant dark:text-neutral-400">Enfoque {index + 1}</span>
                    <span className={`font-headline-md text-headline-md text-[#1b1c1a] dark:text-[#fbf9f5] ${task?.completed ? 'line-through opacity-50' : ''}`}>
                      {task ? task.text : '(Vacío)'}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline-variant group-hover:text-primary dark:group-hover:text-[#dde6d0] transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>

          {/* Footer Action */}
          <button
            onClick={onCancel}
            className="font-label-lg text-label-lg text-on-surface-variant dark:text-neutral-400 hover:text-primary dark:hover:text-[#dde6d0] transition-colors px-lg py-sm rounded-full hover:bg-surface-container-low"
          >
            Cancelar
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
