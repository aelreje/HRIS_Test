import { useState } from 'react';
import { AppShell } from './components/AppShell';
import Login from './Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <AppShell roleId={3} onLogout={() => setIsAuthenticated(false)}>
      {/* 
        This is the Blank Template view as requested. 
        Content for specific navigation items (Master Attendance, My Requests, etc.) 
        will be rendered here when implemented.
      */}
    </AppShell>
  );
}

export default App;
