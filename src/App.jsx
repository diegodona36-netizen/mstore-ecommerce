import React, { useState, useEffect } from 'react';
import { LandingPageTest } from './components/LandingPageTest';
import { SoyTechnoHomePage } from './components/SoyTechnoHomePage';

export function App() {
  const [isTestMode, setIsTestMode] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      // Allow switching between #test (LandingPageTest) and main mode if needed
      setIsTestMode(window.location.hash !== '#legacy');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-white font-sans selection:bg-[#00E5FF] selection:text-black">
      {isTestMode ? (
        <LandingPageTest />
      ) : (
        <SoyTechnoHomePage />
      )}
    </div>
  );
}

export default App;
