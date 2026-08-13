import React from 'react';
import { SoyTechnoHomePage } from './components/SoyTechnoHomePage';

export function App() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans selection:bg-[#0055FF] selection:text-white">
      <SoyTechnoHomePage 
        onBackToMain={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenCelularesCategory={() => {
          const catalogEl = document.getElementById('catalogo') || document.querySelector('section');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default App;
