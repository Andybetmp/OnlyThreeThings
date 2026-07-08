import React from 'react';

export default function BottomNavBar({ activeTab, setActiveTab }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-md px-lg backdrop-blur-md bg-surface/80 dark:bg-[#1e1e1b]/80 shadow-xl border-t border-outline-variant/20 rounded-t-xl">
      {/* Focus / Enfoque */}
      <button 
        className={`flex flex-col items-center justify-center transition-all duration-200 ${
          activeTab === 'focus' 
            ? 'text-[#3a4133] dark:text-[#dde6d0] font-bold scale-98' 
            : 'text-outline dark:text-neutral-400 hover:text-[#3a4133] dark:hover:text-[#dde6d0]'
        }`}
        onClick={() => setActiveTab('focus')}
      >
        <span className={`material-symbols-outlined mb-xs text-[28px] ${activeTab === 'focus' ? 'filled-icon' : ''}`}>
          center_focus_strong
        </span>
        <span className="font-label-md text-label-md">Enfoque</span>
      </button>

      {/* Journal / Diario */}
      <button 
        className={`flex flex-col items-center justify-center transition-all duration-200 ${
          activeTab === 'journal' 
            ? 'text-[#3a4133] dark:text-[#dde6d0] font-bold scale-98' 
            : 'text-outline dark:text-neutral-400 hover:text-[#3a4133] dark:hover:text-[#dde6d0]'
        }`}
        onClick={() => setActiveTab('journal')}
      >
        <span className={`material-symbols-outlined mb-xs text-[28px] ${activeTab === 'journal' ? 'filled-icon' : ''}`}>
          auto_stories
        </span>
        <span className="font-label-md text-label-md">Diario</span>
      </button>

      {/* Settings / Ajustes */}
      <button 
        className={`flex flex-col items-center justify-center transition-all duration-200 ${
          activeTab === 'settings' 
            ? 'text-[#3a4133] dark:text-[#dde6d0] font-bold scale-98' 
            : 'text-outline dark:text-neutral-400 hover:text-[#3a4133] dark:hover:text-[#dde6d0]'
        }`}
        onClick={() => setActiveTab('settings')}
      >
        <span className={`material-symbols-outlined mb-xs text-[28px] ${activeTab === 'settings' ? 'filled-icon' : ''}`}>
          settings
        </span>
        <span className="font-label-md text-label-md">Ajustes</span>
      </button>
    </nav>
  );
}
