import React from 'react';
import { motion } from 'framer-motion';

export default function SettingsTab({ darkMode, setDarkMode, onSimulateMidnight, onClearData }) {
  const handleClearClick = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo tu historial y tareas? Esta acción no se puede deshacer.')) {
      onClearData();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-container-max mx-auto px-gutter py-md flex flex-col gap-lg"
    >
      <div className="mb-md">
        <h1 className="font-display text-display text-[#3a4133] dark:text-[#dde6d0] font-semibold">Ajustes</h1>
        <p className="font-body-lg text-on-surface-variant dark:text-neutral-400">Personaliza y gestiona tu aplicación.</p>
      </div>

      <div className="bg-surface-container-lowest dark:bg-surface-container rounded-xl p-lg shadow-ambient flex flex-col divide-y divide-outline-variant/30 border border-outline-variant/30">
        {/* Dark Mode Theme Option */}
        <div className="py-md flex justify-between items-center">
          <div>
            <h3 className="font-headline-md text-on-surface dark:text-neutral-100 font-semibold">Modo Oscuro</h3>
            <p className="font-body-md text-on-surface-variant dark:text-neutral-400">Cambia el aspecto visual de la aplicación.</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-14 h-8 rounded-full bg-surface-container-high dark:bg-primary-fixed-dim p-xs transition-colors duration-300 flex items-center relative"
          >
            <motion.div 
              layout
              className="w-6 h-6 rounded-full bg-primary dark:bg-on-primary-fixed flex items-center justify-center text-white"
              animate={{ x: darkMode ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <span className="material-symbols-outlined text-[14px]">
                {darkMode ? 'dark_mode' : 'light_mode'}
              </span>
            </motion.div>
          </button>
        </div>

        {/* Simulate Midnight Option */}
        <div className="py-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div>
            <h3 className="font-headline-md text-on-surface dark:text-neutral-100 font-semibold">Simular Cambio de Día</h3>
            <p className="font-body-md text-on-surface-variant dark:text-neutral-400">
              Cambia la fecha interna a ayer para probar cómo el sistema limpia la agenda diaria y archiva las tareas completadas en el Diario.
            </p>
          </div>
          <button 
            onClick={onSimulateMidnight}
            className="bg-secondary-container text-on-secondary-container hover:bg-opacity-90 font-label-lg px-md py-sm rounded-full active:scale-95 transition-all shadow-sm flex items-center gap-xs"
          >
            <span className="material-symbols-outlined text-[20px]">update</span>
            Simular Medianoche
          </button>
        </div>

        {/* Reset Option */}
        <div className="py-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div>
            <h3 className="font-headline-md text-error font-semibold">Restablecer Datos</h3>
            <p className="font-body-md text-on-surface-variant dark:text-neutral-400">
              Borra permanentemente todas las tareas activas y el historial de tu diario en este dispositivo.
            </p>
          </div>
          <button 
            onClick={handleClearClick}
            className="bg-error-container text-on-error-container hover:bg-opacity-90 font-label-lg px-md py-sm rounded-full active:scale-95 transition-all shadow-sm flex items-center gap-xs"
          >
            <span className="material-symbols-outlined text-[20px]">delete_forever</span>
            Restablecer Todo
          </button>
        </div>
      </div>
    </motion.div>
  );
}
