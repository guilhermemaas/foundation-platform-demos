import React, { useState } from 'react';
import { Menu, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: 'Veículo XYZ-1234 com nível de combustível baixo', time: '5 min atrás', type: 'warning' },
    { id: 2, message: 'Manutenção agendada para o veículo GHI-3456', time: '30 min atrás', type: 'info' },
    { id: 3, message: 'Entrega #1042 concluída com sucesso', time: '1 hora atrás', type: 'success' },
  ];

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="h-16 bg-slate-800 border-b border-slate-700 shadow-md flex items-center justify-between px-4">
      <div className="flex items-center">
        <button 
          onClick={onToggleSidebar}
          className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="ml-4 text-xl font-bold text-white hidden md:block">FleetWatch</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-slate-800"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-10">
              <h3 className="px-4 py-2 text-sm font-semibold text-slate-300 border-b border-slate-700">Notificações</h3>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-3 hover:bg-slate-700/50 border-b border-slate-700/50 last:border-0">
                    <div className="flex items-start">
                      <div className={`mt-1 h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                        notification.type === 'warning' ? 'bg-amber-500' : 
                        notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="ml-3">
                        <p className="text-sm text-slate-300">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#" className="block text-center text-xs text-blue-400 hover:text-blue-300 py-2 border-t border-slate-700">
                Ver todas as notificações
              </a>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button 
            onClick={toggleUserMenu}
            className="flex items-center space-x-3 p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <div className="relative">
              <img 
                src={user?.avatar} 
                alt={user?.name} 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-slate-800"></span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.role}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-10">
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                <User className="h-4 w-4 mr-3 text-slate-400" />
                Perfil
              </a>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;