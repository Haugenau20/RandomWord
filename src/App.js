// App.js
import React, { useState } from 'react';
import './App.css';
import WordPicker from './components/WordPicker';
import LandingPage from './components/LandingPage';
import CatchPhrase from './components/CatchPhrase';
import Spells from './components/Spells';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'javelin':
        return <WordPicker onBack={() => setCurrentPage('landing')} />;
      case 'catchphrase':
        return <CatchPhrase onBack={() => setCurrentPage('landing')} />;
      case 'spells':
        return <Spells onBack={() => setCurrentPage('landing')} />;
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