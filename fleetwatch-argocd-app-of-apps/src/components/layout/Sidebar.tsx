import React from 'react';
import { menuItems } from '../../data';
import { ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 w-64 bg-slate-800 border-r border-slate-700 shadow-lg transform transition-transform duration-300 z-10 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              // Dynamically get the icon component
              const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[
                item.icon.charAt(0).toUpperCase() + item.icon.slice(1)
              ];
              
              return (
                <a
                  key={item.path}
                  href="#"
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    item.path === '/dashboard'
                      ? 'bg-blue-600/10 text-blue-500'
                      : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    {IconComponent && <IconComponent className="h-5 w-5 mr-3" />}
                    <span>{item.title}</span>
                  </div>
                  <div className="flex items-center">
                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-xs rounded-full mr-2 ${
                        item.badge.variant === 'error' 
                          ? 'bg-red-500/20 text-red-400' 
                          : item.badge.variant === 'warning'
                          ? 'bg-amber-500/20 text-amber-400'
                          : item.badge.variant === 'success'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {item.badge.count}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </div>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-700">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center">
              <div className="bg-blue-500/20 rounded-lg p-2.5">
                <LucideIcons.HelpCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-white">Precisa de ajuda?</h3>
                <p className="text-xs text-slate-400 mt-0.5">Acesse o suporte</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;