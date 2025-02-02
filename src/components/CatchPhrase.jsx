import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';

const CatchPhrase = ({ onBack }) => {
  const [phrases, setPhrases] = useState(() => {
    const savedPhrases = localStorage.getItem('catchphrases');
    return savedPhrases ? JSON.parse(savedPhrases) : [];
  });
  const [input, setInput] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem('catchphrases', JSON.stringify(phrases));
  }, [phrases]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddPhrase = () => {
    if (input.trim()) {
      setPhrases([...phrases, {
        text: input.trim(),
        createdAt: new Date().toISOString(),
        usageCount: 0
      }]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPhrase();
    }
  };

  const pickRandomPhrase = () => {
    if (phrases.length === 0) return;
    
    setIsAnimating(true);
    
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setSelectedPhrase(randomPhrase.text);
      flashCount++;
      
      if (flashCount >= 10) {
        clearInterval(flashInterval);
        setIsAnimating(false);
        // Update usage count
        setPhrases(phrases.map(phrase => 
          phrase.text === randomPhrase.text 
            ? { ...phrase, usageCount: phrase.usageCount + 1 }
            : phrase
        ));
      }
    }, 100);
  };

  const removePhrase = (indexToRemove) => {
    setPhrases(phrases.filter((_, index) => index !== indexToRemove));
  };

  const clearAllPhrases = () => {
    if (window.confirm('Are you sure you want to clear all catchphrases?')) {
      setPhrases([]);
      setSelectedPhrase('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="text-white hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="text-purple-400" />
            Catchphrase Manager
          </h1>
        </div>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter your catchphrase..."
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white"
          />
          <button
            onClick={handleAddPhrase}
            className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition-colors"
          >
            Add Phrase
          </button>
        </div>

        {/* Phrases List */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-white">Your Catchphrases:</h3>
            {phrases.length > 0 && (
              <button
                onClick={clearAllPhrases}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {phrases.map((phrase, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 bg-slate-800 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-white">{phrase.text}</p>
                  <p className="text-sm text-slate-400">Used: {phrase.usageCount} times</p>
                </div>
                <button
                  onClick={() => removePhrase(index)}
                  className="text-slate-400 hover:text-red-400 ml-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Random Phrase Button */}
        <div className="text-center py-4">
          <button
            onClick={pickRandomPhrase}
            disabled={phrases.length === 0 || isAnimating}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-lg transition-all ${
              phrases.length === 0
                ? 'bg-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            }`}
          >
            {isAnimating ? 'Choosing...' : 'Pick Random Phrase'}
          </button>

          {selectedPhrase && (
            <div className={`mt-6 text-2xl font-bold text-white ${isAnimating ? 'animate-pulse' : ''}`}>
              {selectedPhrase}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatchPhrase;