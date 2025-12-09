import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SpecimenModule from './components/SpecimenModule';
import FinanceModule from './components/FinanceModule';

// Placeholder components for incomplete modules
const InventoryModule = () => <div className="p-10 text-center text-gray-500 glass-panel rounded-xl">Inventory & Feed Management Module (Coming Soon)</div>;
const TicketingModule = () => <div className="p-10 text-center text-gray-500 glass-panel rounded-xl">Ticketing & POS Module (Coming Soon)</div>;

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'finance': return <FinanceModule />;
      case 'specimens': return <SpecimenModule />;
      case 'inventory': return <InventoryModule />;
      case 'ticketing': return <TicketingModule />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-900 text-slate-100 font-sans selection:bg-luxury-gold selection:text-luxury-900">
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main 
        className={`
          transition-all duration-300 ease-in-out
          lg:ml-64 min-h-screen
        `}
      >
        <header className="sticky top-0 z-30 bg-luxury-900/80 backdrop-blur-md border-b border-luxury-700/50 px-8 py-4 flex justify-between items-center">
            <h2 className="text-lg font-medium text-white capitalize">{activeModule.replace('-', ' ')}</h2>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400">System Status</p>
                    <p className="text-xs text-luxury-emerald font-bold flex items-center justify-end">
                        <span className="w-2 h-2 bg-luxury-emerald rounded-full mr-1 animate-pulse"></span>
                        Operational
                    </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-700 border border-gray-600 overflow-hidden">
                    <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>

        <div className="p-4 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
