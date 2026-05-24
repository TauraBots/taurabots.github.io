import { useEffect, useState } from 'react';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/Navbar';
import About from './components/sections/About';
import Footer from './components/sections/Footer';
import Hero from './components/sections/Hero';
import HistoryTimeline from './components/sections/HistoryTimeline';
import Projects from './components/sections/Projects';
import Sponsors from './components/sections/Sponsors';
import Talents from './components/sections/Talents';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      {(currentView === 'home' || currentView === 'history') && (
        <Navbar currentView={currentView} onNavigate={setCurrentView} />
      )}

      {currentView === 'home' && (
        <>
          <Hero />
          <About onNavigate={setCurrentView} />
          <Projects />
          <Sponsors />
          <Talents />
          <Footer />
        </>
      )}

      {currentView === 'history' && (
        <>
          <HistoryTimeline onBack={() => setCurrentView('home')} />
          <Footer />
        </>
      )}

      {currentView === 'login' && (
        <Login
          onLogin={() => setCurrentView('dashboard')}
          onBack={() => setCurrentView('home')}
        />
      )}

      {currentView === 'dashboard' && (
        <Dashboard onLogout={() => setCurrentView('home')} />
      )}
    </div>
  );
}
