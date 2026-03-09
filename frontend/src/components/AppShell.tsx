import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ListTodo,
  CalendarClock, 
  Users, 
  LogOut, 
  PanelLeftClose,
  Menu,
  X,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';
import logoFull from '../assets/image 3.png';

// Types & Config
interface NavItemConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  subItems?: { id: string; label: string }[];
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { 
    id: 'Attendance', 
    label: 'Attendance', 
    icon: ListTodo,
    subItems: [
      { id: 'my-attendance', label: 'My Attendance' },
      { id: 'my-requests', label: 'My Requests' },
      { id: 'my-filing-center', label: 'My Filing Center' },
    ]
  },
  { id: 'Schedule', label: 'Schedule', icon: CalendarClock },
  { id: 'Team', label: 'Team', icon: Users },
];

const NavLink = ({ 
  item, 
  isActive, 
  isCollapsed, 
  onClick 
}: { 
  item: NavItemConfig; 
  isActive: boolean; 
  isCollapsed: boolean;
  onClick: () => void;
}) => {
  const Icon = item.icon;
  
  return (
    <li className="relative">
      {isActive && !isCollapsed && (
        <div className="absolute inset-0 bg-[#E3F2FD] border-r-[8px] border-[#1976D2] z-0 -mx-[43px]" style={{ width: 'calc(100% + 43px)' }} />
      )}
      <button
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          "flex items-center w-full transition-all relative z-10 duration-200 outline-none",
          isCollapsed ? "justify-center px-0 h-[50px]" : "gap-[19px] px-[43px] h-[50px]",
          isActive ? "text-[#1976D2]" : "text-[#455A64] hover:bg-[#F5F5F5] hover:text-[#37474F]"
        )}
      >
        <Icon size={24} className="shrink-0" strokeWidth={1.5} />
        {!isCollapsed && (
          <span className="text-[20px] font-normal tracking-[0.25px] leading-[32px] font-['Roboto',sans-serif] flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">
            {item.label}
          </span>
        )}
      </button>
    </li>
  );
};

interface AppShellProps {
  children: React.ReactNode;
  roleId: number;
  onLogout: () => void;
  activeMenu: string;
  onMenuChange: (id: string) => void;
  activeSubMenu: string;
  onSubMenuChange: (id: string) => void;
}

export const AppShell = ({ 
  children, 
  roleId, 
  onLogout,
  activeMenu,
  onMenuChange,
  activeSubMenu,
  onSubMenuChange
}: AppShellProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    }).toLowerCase();
  };

  const filteredNavItems = useMemo(() => {
    // Consolidated view for all roles for now
    return NAV_ITEMS;
  }, []);

  return (
    <div className="flex h-screen bg-[#ECEFF1] font-['Roboto',sans-serif] antialiased overflow-hidden relative">
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 z-30 transition-opacity lg:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "bg-[#FAFAFA] flex flex-col z-40 shadow-[0px_20px_20px_0px_rgba(5,13,29,0.2)] transition-all duration-300 ease-in-out fixed lg:static h-full shrink-0",
          isCollapsed ? "w-[100px]" : "w-[360px]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className={cn(
          "flex items-center h-[115px] shrink-0 transition-all duration-300",
          isCollapsed ? "justify-center px-0" : "pl-[43px] pr-[20px] justify-between lg:justify-start"
        )}>
          {!isCollapsed ? (
            <img src={logoFull} alt="iREPLY" className="h-[63px] w-auto" />
          ) : (
            <MessageSquare size={36} className="text-[#0D47A1] fill-[#0D47A1]" />
          )}
          <button className="lg:hidden p-2 text-[#37474F]" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* User Profile Section (Interactive Hover) */}
        <button 
          onClick={() => console.log('Navigate to profile')}
          className={cn(
            "h-[82px] w-full flex items-center bg-transparent hover:bg-[#E3F2FD] mb-[48px] transition-all duration-300 shrink-0 px-[36px] gap-[22px] group text-left outline-none focus-visible:bg-[#E3F2FD]",
            isCollapsed && "px-0 justify-center"
          )}
        >
          <div className={cn(
            "rounded-full bg-[#91D5FF] text-[#096DD9] flex items-center justify-center font-normal transition-all shadow-sm group-hover:shadow-md",
            isCollapsed ? "size-[48px] text-[24px]" : "size-[68px] text-[34px]"
          )}>
            U
          </div>
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden text-[#263238]">
              <h2 className="text-[20px] font-normal leading-[32px] tracking-[0.25px] group-hover:text-[#1976D2] transition-colors">User Name</h2>
              <p className="text-[14px] text-[#757575] font-normal leading-[22px] tracking-[0.1px]">Role Name</p>
            </div>
          )}
        </button>

        {/* Primary Navigation List */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar py-2">
          <ul className="flex flex-col gap-4">
            {filteredNavItems.map((item) => (
              <React.Fragment key={item.id}>
                <NavLink 
                  item={item} 
                  isActive={activeMenu === item.id} 
                  isCollapsed={isCollapsed} 
                  onClick={() => onMenuChange(item.id)} 
                />
                
                {/* Sub-Navigation */}
                {!isCollapsed && activeMenu === item.id && item.subItems && (
                  <ul className="flex flex-col -mt-2">
                    {item.subItems.map((sub) => (
                      <li key={sub.id}>
                        <button
                          onClick={() => onSubMenuChange(sub.id)}
                          className={cn(
                            "pl-[91px] py-[4px] text-[20px] text-left transition-colors font-normal leading-[32px] tracking-[0.25px] w-full whitespace-nowrap outline-none",
                            activeSubMenu === sub.id ? "text-[#1976D2]" : "text-[#546E7A] hover:text-[#37474F]"
                          )}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Footer Actions */}
        <footer className={cn(
          "p-[20px] flex shrink-0 transition-all duration-300 gap-4 items-end",
          isCollapsed ? "flex-col items-center" : ""
        )}>
          <button 
            onClick={onLogout}
            className={cn(
              "flex items-center justify-center bg-[#ECEFF1] text-[#37474F] rounded-lg hover:bg-[#CFD8DC] transition-all h-[58px] active:scale-[0.98] outline-none",
              isCollapsed ? "w-[58px]" : "w-[245px] gap-[21px]"
            )}
          >
            <LogOut size={22} />
            {!isCollapsed && <span className="text-[23px] font-normal leading-none whitespace-nowrap">Logout</span>}
          </button>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="size-[58px] flex-shrink-0 flex items-center justify-center bg-[#ECEFF1] text-[#37474F] rounded-lg hover:bg-[#CFD8DC] transition-all hidden lg:flex outline-none"
          >
            <PanelLeftClose size={24} className={cn("transition-transform duration-300", isCollapsed && "rotate-180")} />
          </button>
        </footer>
      </aside>

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 relative">
        {/* Top Header Bar */}
        <header className="h-[58px] bg-[#0D47A1] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.2)] z-10 flex items-center justify-end px-10 gap-8">
          <button className="lg:hidden p-2 text-white mr-auto" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center gap-8 text-white text-[14px] font-normal leading-[22px]">
            <span>{formatDate(currentTime)}</span>
            <span>{formatTime(currentTime)}</span>
            <span className="opacity-80">(Timezone Name)</span>
          </div>
        </header>
        
        {/* Content Box */}
        <main className="flex-1 overflow-y-auto flex justify-center py-0 transition-all duration-300">
          <div className={cn(
            "min-h-full bg-[#F5F5F5] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-500 ease-in-out",
            isCollapsed ? "w-full lg:w-[calc(100%-60px)] max-w-[1600px]" : "w-full lg:w-[1200px]"
          )}>
            <div className="p-6 md:p-8 lg:p-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
