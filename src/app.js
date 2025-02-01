// src/App.js
import React from 'react';
import './App.css';
import WordPicker from './components/WordPicker';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <WordPicker />
    </div>
  );
}

export default App;