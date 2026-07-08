import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import TopAppBar from './components/TopAppBar';
import BottomNavBar from './components/BottomNavBar';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';
import ReplaceModal from './components/ReplaceModal';
import CelebrationView from './components/CelebrationView';
import JournalTab from './components/JournalTab';
import SettingsTab from './components/SettingsTab';

export default function App() {
  // --- Navigation & Theme State ---
  const [activeTab, setActiveTab] = useState('focus');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('solo3cosas_darkmode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // --- Core Application State ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('solo3cosas_tasks');
    return saved ? JSON.parse(saved) : [null, null, null];
  });
  
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('solo3cosas_history');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentDate, setCurrentDate] = useState(() => {
    const saved = localStorage.getItem('solo3cosas_date');
    const todayStr = new Date().toLocaleDateString('sv'); // YYYY-MM-DD format
    return saved || todayStr;
  });

  // --- Dialog / UI States ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [replaceNewText, setReplaceNewText] = useState('');
  const [dismissedCelebration, setDismissedCelebration] = useState(false);

  // --- Sync Dark Mode Theme ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('solo3cosas_darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  // --- Save states to LocalStorage on updates ---
  useEffect(() => {
    localStorage.setItem('solo3cosas_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('solo3cosas_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('solo3cosas_date', currentDate);
  }, [currentDate]);

  // --- Midnight Reset Checking Logic ---
  const checkMidnightReset = useCallback((force = false) => {
    const todayStr = new Date().toLocaleDateString('sv'); // YYYY-MM-DD
    const storedDate = localStorage.getItem('solo3cosas_date') || currentDate;

    if (storedDate !== todayStr || force) {
      // 1. Gather all tasks completed on that day
      const completedTasksText = tasks
        .filter(t => t !== null && t.completed)
        .map(t => t.text);

      // 2. If there are completed tasks, add them to history
      if (completedTasksText.length > 0) {
        setHistory(prev => ({
          ...prev,
          [storedDate]: completedTasksText
        }));
      }

      // 3. Reset the board & update date
      setTasks([null, null, null]);
      setCurrentDate(todayStr);
      localStorage.setItem('solo3cosas_date', todayStr);
      setDismissedCelebration(false);
    }
  }, [tasks, currentDate]);

  // Run date check on mount
  useEffect(() => {
    checkMidnightReset();

    // Set up a timer to check every 30 seconds
    const interval = setInterval(() => {
      checkMidnightReset();
    }, 30000);

    return () => clearInterval(interval);
  }, [checkMidnightReset]);

  // --- Task Operations ---
  const handleSaveTask = (index, text) => {
    const updated = [...tasks];
    if (updated[index]) {
      // Editing existing task
      updated[index] = { ...updated[index], text };
    } else {
      // Adding new task in empty slot
      updated[index] = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text,
        completed: false
      };
    }
    setTasks(updated);
    setDismissedCelebration(false); // Reset celebration dismissal if we modify board
  };

  const handleToggleComplete = (index) => {
    const updated = [...tasks];
    if (updated[index]) {
      updated[index] = { ...updated[index], completed: !updated[index].completed };
      setTasks(updated);
      
      // If we mark something uncompleted, reset celebration dismissal
      if (!updated[index].completed) {
        setDismissedCelebration(false);
      }
    }
  };

  const handleDeleteTask = (index) => {
    const updated = [...tasks];
    updated[index] = null;
    setTasks(updated);
    setDismissedCelebration(false); // Reset celebration dismissal
  };

  // --- Add Task Handler (Global / Header button) ---
  const handleAddTaskRequest = (text) => {
    setIsAddModalOpen(false);

    // Find first empty slot
    const emptyIndex = tasks.findIndex(t => t === null);

    if (emptyIndex !== -1) {
      // We have room, save directly
      handleSaveTask(emptyIndex, text);
    } else {
      // All 3 slots are full, trigger replace modal
      setReplaceNewText(text);
      setIsReplaceModalOpen(true);
    }
  };

  // --- Replace Task Selector ---
  const handleConfirmReplace = (indexToReplace, newText) => {
    setIsReplaceModalOpen(false);
    
    const updated = [...tasks];
    updated[indexToReplace] = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: newText,
      completed: false
    };

    setTasks(updated);
    setReplaceNewText('');
    setDismissedCelebration(false);
  };

  // --- Celebration State Calculation ---
  const activeTasksCount = tasks.filter(t => t !== null).length;
  const completedTasksCount = tasks.filter(t => t !== null && t.completed).length;
  const isCelebrationTriggered = activeTasksCount === 3 && completedTasksCount === 3 && !dismissedCelebration;

  // --- Spanish Date Formatting for Header ---
  const getHeaderDate = () => {
    try {
      const today = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const dateStr = today.toLocaleDateString('es-ES', options);
      return dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    } catch {
      return "Hoy";
    }
  };

  // --- Settings Tab Handlers ---
  const handleSimulateMidnight = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString('sv'); // YYYY-MM-DD

    // 1. Force the stored date in localStorage to yesterday
    localStorage.setItem('solo3cosas_date', yesterdayStr);

    // 2. Perform the reset check immediately
    checkMidnightReset(true);

    alert('Se simuló el paso de la medianoche. Las tareas del día anterior han sido archivadas y la agenda diaria se ha reiniciado.');
    setActiveTab('focus');
  };

  const handleClearData = () => {
    localStorage.removeItem('solo3cosas_tasks');
    localStorage.removeItem('solo3cosas_history');
    localStorage.removeItem('solo3cosas_date');
    localStorage.removeItem('solo3cosas_darkmode');
    
    // Reset states to default
    setTasks([null, null, null]);
    setHistory({});
    setCurrentDate(new Date().toLocaleDateString('sv'));
    setDismissedCelebration(false);
    setActiveTab('focus');
  };

  return (
    <div className="min-h-full flex flex-col bg-surface dark:bg-[#121311] text-on-surface dark:text-[#fbf9f5] transition-colors duration-300">
      <TopAppBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNewTaskClick={() => setIsAddModalOpen(true)}
        hasThreeTasks={activeTasksCount === 3}
      />

      <main className="flex-1 flex flex-col pb-[100px] md:pb-lg">
        <AnimatePresence mode="wait">
          {activeTab === 'focus' && (
            <motion.div
              key="focus-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-center"
            >
              {isCelebrationTriggered ? (
                <CelebrationView 
                  onBackToDashboard={() => setDismissedCelebration(true)} 
                />
              ) : (
                <div className="w-full max-w-container-max mx-auto px-gutter py-xl flex flex-col gap-xl">
                  {/* Header info */}
                  <section className="text-center md:text-left">
                    <h1 className="font-display text-display text-[#3a4133] dark:text-[#dde6d0] mb-sm font-semibold">
                      {getHeaderDate()}
                    </h1>
                    <p className="font-body-lg text-on-surface-variant dark:text-neutral-400">
                      Concéntrate en lo esencial hoy. Solo tres cosas.
                    </p>
                  </section>

                  {/* The Grid of 3 Things */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-lg md:gap-md w-full">
                    {tasks.map((task, index) => (
                      <TaskCard
                        key={index}
                        index={index}
                        task={task}
                        onSaveTask={handleSaveTask}
                        onToggleComplete={handleToggleComplete}
                        onDeleteTask={handleDeleteTask}
                      />
                    ))}
                  </section>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'journal' && (
            <JournalTab key="journal-tab" history={history} />
          )}

          {activeTab === 'settings' && (
            <SettingsTab 
              key="settings-tab"
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onSimulateMidnight={handleSimulateMidnight}
              onClearData={handleClearData}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Navigation bar */}
      <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Add Task Dialog */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onAdd={handleAddTaskRequest}
        onCancel={() => setIsAddModalOpen(false)}
      />

      {/* Global Replace Modal */}
      <ReplaceModal
        isOpen={isReplaceModalOpen}
        currentTasks={tasks}
        newTaskText={replaceNewText}
        onSelectReplace={handleConfirmReplace}
        onCancel={() => {
          setIsReplaceModalOpen(false);
          setReplaceNewText('');
        }}
      />
    </div>
  );
}
