import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskCard({ index, task, onSaveTask, onToggleComplete, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const inputRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autofocus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleStartAdd = () => {
    setInputText('');
    setIsEditing(true);
  };

  const handleStartEdit = () => {
    setInputText(task ? task.text : '');
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setInputText('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSaveTask(index, inputText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel(e);
    }
  };

  // Determine card styles based on task state
  if (isEditing) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-surface-container-lowest dark:bg-surface-container border-2 border-primary rounded-xl p-md flex flex-col shadow-ambient h-full min-h-[300px] justify-between"
      >
        <div className="flex justify-between items-start">
          <span className="font-label-lg text-on-surface-variant bg-surface-variant/40 dark:bg-white/10 px-sm py-xs rounded-full">
            Focus {index + 1}
          </span>
        </div>
        
        <form onSubmit={handleSave} className="mt-md flex flex-col flex-1 justify-between">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="¿Qué vas a lograr en esta prioridad?"
            className="w-full bg-transparent border-0 font-headline-lg text-[#333333] dark:text-[#fbf9f5] placeholder-on-surface-variant/40 outline-none resize-none focus:ring-0 focus:border-transparent p-0 leading-tight flex-1 mb-md h-[120px]"
            maxLength={100}
          />
          <div className="flex justify-between items-center w-full mt-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="px-sm py-xs text-on-surface-variant font-label-lg hover:bg-surface-container rounded-full transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-md py-xs bg-primary text-on-primary font-label-lg rounded-full disabled:opacity-50 hover:bg-opacity-95 active:scale-98 transition-all shadow-sm"
            >
              Guardar
            </button>
          </div>
        </form>
      </motion.div>
    );
  }

  if (!task) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleStartAdd}
        className="border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-md flex flex-col items-center justify-center h-full min-h-[300px] hover:bg-surface-container-low dark:hover:bg-surface-container transition-all cursor-pointer group"
      >
        <div className="w-16 h-16 rounded-full bg-surface-variant/40 dark:bg-white/10 flex items-center justify-center text-on-surface-variant group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
          <span className="material-symbols-outlined text-[32px]">add</span>
        </div>
        <h2 className="font-headline-md text-on-surface-variant text-center leading-snug mt-md group-hover:text-on-surface transition-colors">
          ¿Qué es lo siguiente más importante?
        </h2>
      </motion.div>
    );
  }

  const isCompleted = task.completed;
  const isSageGreen = index === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={`rounded-xl p-md flex flex-col justify-between shadow-ambient transition-all duration-300 h-full min-h-[300px] relative pressed-state ${
        isCompleted
          ? 'bg-surface-container-lowest dark:bg-surface-container opacity-90 task-completed-pulse'
          : isSageGreen
          ? 'bg-primary-fixed dark:bg-primary-fixed-dim text-on-primary-fixed-variant'
          : 'bg-surface-container-lowest dark:bg-surface-container text-on-surface'
      }`}
    >
      <div className="flex justify-between items-start mb-auto relative w-full">
        <span 
          className={`font-label-lg rounded-full px-sm py-xs font-semibold ${
            isCompleted 
              ? 'text-[#390c02] dark:text-[#ffdbd1] bg-[#ffdbd1] dark:bg-[#783c2b]'
              : isSageGreen
              ? 'text-[#161e10] dark:text-[#dde6d0] bg-[#b8c1ac]/50 dark:bg-[#596150]/40'
              : 'text-[#1b1c1a] dark:text-[#fbf9f5] bg-[#e4e2de] dark:bg-[#30312e]'
          }`}
        >
          Enfoque {index + 1}
          {isCompleted && (
            <span className="ml-xs text-[10px] uppercase font-bold tracking-wider opacity-90">
              ¡Hecho!
            </span>
          )}
        </span>

        {/* Action Menu button */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`hover:opacity-75 transition-opacity p-1 rounded-full ${
              isSageGreen && !isCompleted ? 'text-on-primary-fixed-variant hover:bg-white/10' : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-1 w-32 bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 rounded-lg shadow-lg z-20 py-1 overflow-hidden"
              >
                <button
                  onClick={handleStartEdit}
                  className="w-full text-left px-md py-xs text-body-md text-on-surface hover:bg-surface-container transition-colors flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Editar
                </button>
                <button
                  onClick={() => {
                    onDeleteTask(index);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-md py-xs text-body-md text-error hover:bg-error/10 transition-colors flex items-center gap-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Eliminar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-lg flex flex-col gap-md">
        <h2 
          className={`font-headline-lg leading-tight transition-all font-semibold ${
            isCompleted 
              ? 'text-neutral-700 dark:text-neutral-200 animated-strikethrough' 
              : isSageGreen 
              ? 'text-[#161e10] dark:text-[#dde6d0]' 
              : 'text-[#1b1c1a] dark:text-[#fbf9f5]'
          }`}
        >
          {task.text}
        </h2>

        <label className="flex items-center gap-sm cursor-pointer group w-max">
          <button
            onClick={() => onToggleComplete(index)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
              isCompleted
                ? 'bg-primary border-primary text-on-primary'
                : 'border-outline-variant dark:border-outline bg-transparent text-transparent hover:border-primary dark:hover:border-primary-fixed-dim hover:bg-primary/10'
            }`}
          >
            <span className={`material-symbols-outlined text-[20px] ${isCompleted ? 'filled-icon font-bold' : 'opacity-0 group-hover:opacity-100'}`}>
              check
            </span>
          </button>
          <span 
            className={`font-body-md transition-colors ${
              isCompleted 
                ? 'text-neutral-700 dark:text-neutral-300 font-medium' 
                : isSageGreen 
                ? 'text-[#161e10]/80 dark:text-[#dde6d0]/80 group-hover:text-[#161e10] dark:group-hover:text-[#dde6d0]'
                : 'text-outline dark:text-outline-variant group-hover:text-primary dark:group-hover:text-primary-fixed-dim'
            }`}
            onClick={() => onToggleComplete(index)}
          >
            {isCompleted ? 'Completada' : 'Marcar completado'}
          </span>
        </label>
      </div>
    </motion.div>
  );
}
