import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddTaskModal({ isOpen, onAdd, onCancel }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setText('');
      // Timeout to wait for animation entry
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
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
          className="bg-surface-container-lowest dark:bg-surface-container w-full max-w-[500px] rounded-[2rem] p-lg shadow-[0_30px_60px_-15px_rgba(89,97,80,0.12)] flex flex-col border border-outline-variant/30"
        >
          <div className="text-center mb-md">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Agregar Prioridad
            </h2>
            <p className="font-body-md text-on-surface-variant mt-xs">
              Escribe lo siguiente más importante en lo que te enfocarás hoy.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ej. Escribir propuesta de diseño..."
              className="w-full bg-surface dark:bg-surface-dim border border-outline-variant/50 rounded-lg p-md text-body-lg text-on-surface placeholder-on-surface-variant/40 outline-none resize-none focus:ring-2 focus:ring-primary focus:border-transparent h-[100px] font-body-md"
              maxLength={100}
            />

            <div className="flex gap-sm justify-end items-center mt-sm">
              <button
                type="button"
                onClick={onCancel}
                className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors px-md py-sm rounded-full hover:bg-surface-container-low"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!text.trim()}
                className="bg-primary text-on-primary font-label-lg text-label-lg px-xl py-sm rounded-full disabled:opacity-50 hover:bg-opacity-95 active:scale-95 transition-all shadow-ambient pressed-state"
              >
                Agregar
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
