import React from 'react';
import { LayoutDashboard, Wallet, PawPrint, ShoppingBag, Ticket, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'finance', label: 'Core Finance (GL)', icon: Wallet },
    { id: 'specimens', label: 'Specimen Mgmt', icon: PawPrint },
    { id: 'inventory', label: 'Feed & Inventory', icon: ShoppingBag },
    { id: 'ticketing', label: 'Visitor & POS', icon: Ticket },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleSidebar}
          className="p-2 bg-luxury-800 text-luxury-gold rounded-lg border border-luxury-700"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-luxury-900 border-r border-luxury-700
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col glass-panel border-r-0">
          <div className="p-8 border-b border-luxury-700/50">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              KEBNA<span className="text-luxury-gold">BIN</span>
            </h1>
            <p className="text-xs text-luxury-gold/70 mt-1 uppercase tracking-widest">AI-Native ERP</p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group
                  ${activeModule === item.id 
                    ? 'bg-luxury-800 text-luxury-gold border border-luxury-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                <item.icon size={20} className={`${activeModule === item.id ? 'text-luxury-gold' : 'group-hover:text-white'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-luxury-700/50">
            <div className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-luxury-gold to-yellow-600 flex items-center justify-center text-xs font-bold text-black">
                PA
              </div>
              <div>
                <p className="text-xs font-medium text-white">Prof. Accounting</p>
                <p className="text-[10px] text-gray-400">System Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
