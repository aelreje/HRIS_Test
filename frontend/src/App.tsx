import { useState } from 'react';
import { AppShell } from './components/AppShell';
import { AttendanceModule } from './components/AttendanceModule';
import { RequestsModule } from './components/RequestsModule';
import { FilingCenterModule } from './components/FilingCenterModule';
import Login from './Login';

const NAV_ITEMS = [
  { id: 'Dashboard', label: 'Dashboard' },
  { 
    id: 'Attendance', 
    label: 'Attendance',
    subItems: [
      { id: 'my-attendance', label: 'My Attendance' },
      { id: 'my-requests', label: 'My Requests' },
      { id: 'my-filing-center', label: 'My Filing Center' },
    ]
  },
  { id: 'Schedule', label: 'Schedule' },
  { id: 'Team', label: 'Team' },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Attendance');
  const [activeSubMenu, setActiveSubMenu] = useState('my-attendance');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    // High-fidelity module implementations
    if (activeMenu === 'Attendance') {
      if (activeSubMenu === 'my-attendance') return <AttendanceModule />;
      if (activeSubMenu === 'my-requests') return <RequestsModule />;
      if (activeSubMenu === 'my-filing-center') return <FilingCenterModule />;
    }

    // Determine the header text
    const headerTitle = activeMenu === 'Attendance' 
      ? NAV_ITEMS.find(i => i.id === 'Attendance')?.subItems?.find(s => s.id === activeSubMenu)?.label || activeMenu
      : activeMenu;

    // All other modules show the Blank Template per Figma 2096:2601
    return (
      <div className="flex flex-col gap-4 md:gap-6 animate-in fade-in duration-500">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-[34px] font-normal text-[#263238] leading-tight md:leading-[40px] tracking-[0.25px] font-['Roboto',sans-serif]">
            {headerTitle}
          </h1>
          <div className="h-1 w-12 md:w-20 bg-[#1976D2] rounded-full mt-1 md:mt-2" />
        </div>
        
        {/* Pristine Empty Container - Responsive Height */}
        <div className="mt-6 md:mt-10 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl h-[300px] md:h-[400px] bg-white/50">
          <p className="text-slate-400 font-medium italic text-sm md:text-base px-6 text-center">
            {headerTitle} content will be implemented here.
          </p>
        </div>
      </div>
    );
  };

  return (
    <AppShell 
      roleId={3} 
      onLogout={() => setIsAuthenticated(false)}
      activeMenu={activeMenu}
      onMenuChange={setActiveMenu}
      activeSubMenu={activeSubMenu}
      onSubMenuChange={setActiveSubMenu}
    >
      {renderContent()}
    </AppShell>
  );
}

export default App;
