// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import WordPicker from './components/WordPicker';
import LandingPage from './components/LandingPage';
import CatchPhrase from './components/CatchPhrase';
import Spells from './components/Spells';
import SocialInteractions from './components/SocialInteractions';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    // Handle browser back button
    const handlePopState = (event) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigation = (page) => {
    window.history.pushState({ page }, '', `/${page}`);
    setCurrentPage(page);
  };

  const handleBack = () => {
    window.history.back();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'javelin':
        return <WordPicker onBack={handleBack} />;
      case 'catchphrase':
        return <CatchPhrase onBack={handleBack} />;
      case 'spells':
        return <Spells onBack={handleBack} />;
      case 'social':
        return <SocialInteractions onBack={handleBack} />;
      default:
        return <LandingPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {renderPage()}
    </div>
  );
}

export default App;