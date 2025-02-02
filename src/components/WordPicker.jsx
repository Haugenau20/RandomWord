import React, { useState, useEffect } from 'react';
import { Cloud, Zap, Eye, EyeOff } from 'lucide-react';

const WordPicker = () => {
  const defaultWords = [
    "Zeus Juice",
    "Pew Pew",
    "Blitzgrød",
    "Kildepind",
    "Freedom Thunder",
    "Tordenfar",
    "Thors Finger"
  ];

  const [words, setWords] = useState(() => {
    const savedWords = localStorage.getItem('stormWords');
    return savedWords ? JSON.parse(savedWords) : [];
  });
  const [input, setInput] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDefaultWords, setShowDefaultWords] = useState(false);

  useEffect(() => {
    localStorage.setItem('stormWords', JSON.stringify(words));
  }, [words]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddWord = () => {
    if (input.trim()) {
      setWords([...words, input.trim()]);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddWord();
    }
  };

  const pickRandomWord = () => {
    if (words.length === 0) return;
    
    setIsAnimating(true);
    
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      setSelectedWord(words[Math.floor(Math.random() * words.length)]);
      flashCount++;
      
      if (flashCount >= 10) {
        clearInterval(flashInterval);
        setIsAnimating(false);
      }
    }, 100);
  };

  const removeWord = (indexToRemove) => {
    setWords(words.filter((_, index) => index !== indexToRemove));
  };

  const clearAllWords = () => {
    if (window.confirm('Are you sure you want to clear all words?')) {
      setWords([]);
      setSelectedWord('');
    }
  };

  const addDefaultWords = () => {
    const newWords = [...new Set([...words, ...defaultWords])];
    setWords(newWords);
  };

  const toggleDefaultWords = () => {
    setShowDefaultWords(!showDefaultWords);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto max-w-2xl px-4 py-6">
        {/* Main Word Picker Section */}
        <div className="bg-slate-900 rounded-lg shadow-xl mb-4">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Cloud className="text-blue-400" />
                Javelin of Lightning Command Words!
              </h1>
            </div>

            {/* Input Section */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter a word..."
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded text-white"
              />
              <button
                onClick={handleAddWord}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
              >
                Add Word
              </button>
            </div>

            {/* Words List */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg text-white">Your Added Words:</h3>
                {words.length > 0 && (
                  <button
                    onClick={clearAllWords}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-slate-800 text-white rounded-full flex items-center gap-2"
                  >
                    {word}
                    <button
                      onClick={() => removeWord(index)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Random Word Button */}
            <div className="text-center py-4">
              <button
                onClick={pickRandomWord}
                disabled={words.length === 0 || isAnimating}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                  words.length === 0
                    ? 'bg-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {isAnimating ? 'Consulting the Storm...' : 'Call Upon the Storm'}
              </button>

              {selectedWord && (
                <div className={`mt-6 text-2xl font-bold text-white ${isAnimating ? 'animate-pulse' : ''}`}>
                  {selectedWord}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Command Words Panel */}
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="text-yellow-400" />
              Command Words
              <button
                onClick={toggleDefaultWords}
                className="text-white hover:text-blue-400 transition-colors"
                title={showDefaultWords ? "Hide Command Words" : "Show Command Words"}
              >
                {showDefaultWords ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </h3>
          </div>
          
          {showDefaultWords && (
            <div className="flex flex-wrap gap-2 mb-4">
              {defaultWords.map((word, index) => (
                <div key={index} className="px-3 py-1 bg-slate-700 text-white rounded">
                  {word}
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={addDefaultWords}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
          >
            Add Command Words
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordPicker;