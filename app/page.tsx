'use client';

import { useState } from 'react';
import LandingPage from '../components/LandingPage';
import { AppView } from '../types';

export default function Home() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);

  const handleEnterApp = () => {
    setCurrentView(AppView.PREVIEW);
  };

  if (currentView === AppView.LANDING) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  return (
    <div className="w-full h-full bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the App</h1>
        <p className="text-slate-400">Preview view coming soon...</p>
      </div>
    </div>
  );
}
