import React from 'react';

export default function TopAppBar({ activeTab, setActiveTab, onNewTaskClick, hasThreeTasks }) {
  return (
    <>
      {/* TopAppBar (Web) */}
      <header className="hidden md:flex justify-between items-center py-lg px-gutter max-w-container-max mx-auto w-full bg-transparent">
        <div className="flex-1">
          <span
            className="font-display text-display text-[#3a4133] dark:text-[#dde6d0] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setActiveTab('focus')}
          >
            Only Three Things
          </span>
        </div>
        <nav className="flex gap-md items-center">
          <button
            className={`transition-all text-body-md ${activeTab === 'focus'
                ? 'text-[#3a4133] dark:text-[#dde6d0] font-bold'
                : 'text-on-surface-variant dark:text-neutral-400 hover:text-[#3a4133] dark:hover:text-[#dde6d0]'
              }`}
            onClick={() => setActiveTab('focus')}
          >
            Enfoque
          </button>
          <button
            className={`transition-all text-body-md ${activeTab === 'journal'
                ? 'text-[#3a4133] dark:text-[#dde6d0] font-bold'
                : 'text-on-surface-variant dark:text-neutral-400 hover:text-[#3a4133] dark:hover:text-[#dde6d0]'
              }`}
            onClick={() => setActiveTab('journal')}
          >
            Diario
          </button>
          <button
            className={`transition-all text-body-md ${activeTab === 'settings'
                ? 'text-[#3a4133] dark:text-[#dde6d0] font-bold'
                : 'text-on-surface-variant dark:text-neutral-400 hover:text-[#3a4133] dark:hover:text-[#dde6d0]'
              }`}
            onClick={() => setActiveTab('settings')}
          >
            Ajustes
          </button>

          {activeTab === 'focus' && hasThreeTasks && (
            <button
              onClick={onNewTaskClick}
              className="ml-md bg-primary text-on-primary font-label-lg text-label-lg px-sm py-xs rounded-full hover:bg-opacity-90 active:scale-95 transition-all flex items-center gap-xs shadow-ambient pressed-state"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Nueva Tarea
            </button>
          )}
        </nav>
      </header>

      {/* TopAppBar (Mobile) */}
      <header className="md:hidden flex justify-between items-center py-md px-gutter w-full bg-transparent">
        <span
          className="font-display text-headline-md text-[#3a4133] dark:text-[#dde6d0] font-semibold cursor-pointer"
          onClick={() => setActiveTab('focus')}
        >
          Solo 3 Cosas
        </span>
        {activeTab === 'focus' && hasThreeTasks && (
          <button
            onClick={onNewTaskClick}
            className="bg-primary text-on-primary p-xs rounded-full hover:bg-opacity-90 active:scale-95 transition-all flex items-center justify-center shadow-ambient"
            title="Nueva Tarea"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        )}
      </header>
    </>
  );
}
