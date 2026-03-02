import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CalendarDays, 
  Users, 
  LogOut, 
  PanelLeftClose,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';
import logoFull from '../assets/image 3.png';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const NavItem = ({ icon: Icon, label, isActive, isCollapsed, onClick, children }: NavItemProps) => (
  <div className="w-full">
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full py-[10px] transition-all relative group h-[50px]",
        isCollapsed ? "justify-center px-0" : "gap-[20px] px-[32px]",
        isActive 
          ? "bg-[#E3F2FD] text-[#1976D2]" 
          : "text-[#37474F] hover:bg-[#F5F5F5]"
      )}
    >
      <Icon size={24} className={cn(isActive ? "text-[#1976D2]" : "text-[#37474F]")} />
      {!isCollapsed && (
        <span className="text-[23px] font-normal tracking-normal text-left leading-[32px] font-['Roboto',sans-serif]">{label}</span>
      )}
      {isActive && (
        <div className="absolute right-0 top-0 bottom-0 w-[8px] bg-[#1976D2]" />
      )}
    </button>
    {isActive && children && !isCollapsed && (
      <div className="flex flex-col bg-[#FAFAFA]">
        {children}
      </div>
    )}
  </div>
);

const SubNavItem = ({ label, isActive }: { label: string, isActive?: boolean }) => (
  <button className={cn(
    "pl-[102px] py-[10px] text-[20px] text-left transition-colors font-normal leading-[32px] font-['Roboto',sans-serif] tracking-[0.25px] h-[50px]",
    isActive ? "text-[#1976D2]" : "text-[#546E7A] hover:text-[#37474F]"
  )}>
    {label}
  </button>
);

interface AppShellProps {
  children: React.ReactNode;
  roleId: number;
  onLogout: () => void;
}

export const AppShell = ({ children, roleId, onLogout }: AppShellProps) => {
  const [activeMenu, setActiveMenu] = useState('Attendance');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#CFD8DC] font-['Roboto',sans-serif] antialiased overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-[#FAFAFA] flex flex-col z-20 shadow-[0px_20px_20px_0px_rgba(5,13,29,0.2)] transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[100px]" : "w-[361px]"
        )}
      >
        {/* Branding */}
        <div className={cn(
          "p-[29px] mb-[40px] flex items-center h-[121px]",
          isCollapsed ? "justify-center px-0" : "pl-[42px]"
        )}>
          {!isCollapsed ? (
            <img src={logoFull} alt="iREPLY" className="h-[63px] w-auto object-contain" />
          ) : (
            <MessageSquare size={36} className="text-[#0D47A1] fill-[#0D47A1]" />
          )}
        </div>

        {/* User Profile */}
        <div className={cn(
          "mb-[56px] flex items-center",
          isCollapsed ? "px-[16px] justify-center" : "px-[50px] gap-[8px]"
        )}>
          <div className={cn(
            "rounded-full bg-[#E3F2FD] flex-shrink-0 overflow-hidden shadow-sm transition-all duration-300",
            isCollapsed ? "w-[48px] h-[48px]" : "w-[68px] h-[68px]"
          )}>
            {/* Placeholder for user avatar */}
          </div>
          {!isCollapsed && (
            <div className="flex flex-col ml-[8px] whitespace-nowrap overflow-hidden">
              <div className="text-[20px] font-normal text-[#263238] leading-[32px] tracking-[0.25px]">User Name</div>
              <div className="text-[14px] text-[#757575] font-normal leading-[22px] tracking-[0.1px]">Role Name</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-1 overflow-y-auto no-scrollbar pt-[10px]">
          <NavItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            isActive={activeMenu === 'Dashboard'} 
            isCollapsed={isCollapsed}
            onClick={() => setActiveMenu('Dashboard')} 
          />
          
          <NavItem 
            icon={CalendarCheck} 
            label="Attendance" 
            isActive={activeMenu === 'Attendance'} 
            isCollapsed={isCollapsed}
            onClick={() => setActiveMenu('Attendance')}
          >
            {roleId >= 3 && <SubNavItem label="Master Attendance" isActive />}
            {roleId >= 3 && <SubNavItem label="Final Approvals" />}
            <SubNavItem label="My Requests" />
            <SubNavItem label="My Filing Center" />
            <SubNavItem label="My Financial Records" />
          </NavItem>

          <NavItem 
            icon={CalendarDays} 
            label="Schedule" 
            isActive={activeMenu === 'Schedule'} 
            isCollapsed={isCollapsed}
            onClick={() => setActiveMenu('Schedule')} 
          />

          <NavItem 
            icon={Users} 
            label="Team" 
            isActive={activeMenu === 'Team'} 
            isCollapsed={isCollapsed}
            onClick={() => setActiveMenu('Team')} 
          />
        </nav>

        {/* Footer */}
        <div className={cn(
          "p-[20px] pt-0 mt-auto flex",
          isCollapsed ? "flex-col gap-[16px] items-center" : "gap-[28px]"
        )}>
          <button 
            onClick={onLogout}
            className={cn(
              "flex items-center justify-center bg-[#ECEFF1] text-[#37474F] rounded-[8px] hover:bg-[#E1E4E7] transition-all h-[58px]",
              isCollapsed ? "w-[58px]" : "flex-1 gap-[21px] px-[31px] py-[13px]"
            )}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={24} className="text-[#37474F]" />
            {!isCollapsed && <span className="font-normal text-[23px] leading-[32px]">Logout</span>}
          </button>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-[58px] h-[58px] flex-shrink-0 flex items-center justify-center bg-[#ECEFF1] text-[#37474F] rounded-[8px] hover:bg-[#E1E4E7] transition-all"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeftClose size={24} className={cn("text-[#37474F] transition-transform duration-300", isCollapsed && "rotate-180")} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Bar */}
        <header className="h-[58px] bg-[#0D47A1] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.2)] z-10 w-full flex-shrink-0" />
        
        {/* Content Box */}
        <main className="flex-1 overflow-y-auto p-0 flex justify-center pt-[0px]">
          <div className="w-[984px] min-h-full bg-[#FAFAFA] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.2),0px_2px_2px_0px_rgba(0,0,0,0.14),0px_1px_5px_0px_rgba(0,0,0,0.12)] transition-all duration-300">
            <div className="p-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
