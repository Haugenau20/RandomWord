import React, { useState, useEffect } from 'react';
import { Cloud, Zap, Share2, Eye, EyeOff } from 'lucide-react';

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
  const [showCopied, setShowCopied] = useState(false);
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

  const shareWordList = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Main Content */}
      <div className="flex gap-6">
        {/* Command Words Panel */}
        <div className="w-64 bg-slate-800 p-4 rounded-lg h-fit">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="text-yellow-400" />
              Command Words
            </h3>
            <button
              onClick={toggleDefaultWords}
              className="text-white hover:text-blue-400 transition-colors"
              title={showDefaultWords ? "Hide Command Words" : "Show Command Words"}
            >
              {showDefaultWords ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {showDefaultWords && (
            <div className="flex flex-col gap-2">
              {defaultWords.map((word, index) => (
                <div key={index} className="px-3 py-1 bg-slate-700 text-white rounded">
                  {word}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={addDefaultWords}
            className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
          >
            Add Command Words
          </button>
        </div>

        {/* Main Word Picker */}
        <div className="flex-1 bg-slate-900 p-6 text-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Cloud className="text-blue-400" />
              Javelin of Lightning Command Words!
            </div>
            <button
              onClick={shareWordList}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <Share2 size={16} />
              Share Link
              {showCopied && (
                <span className="absolute mt-8 px-2 py-1 bg-green-600 rounded text-sm">
                  Copied!
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter a word..."
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded"
            />
            <button
              onClick={handleAddWord}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors"
            >
              Add Word
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg">Your Added Words:</h3>
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
                  className="px-3 py-1 bg-slate-800 rounded-full flex items-center gap-2"
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

          <div className="text-center">
            <button
              onClick={pickRandomWord}
              disabled={words.length === 0 || isAnimating}
              className={`px-6 py-3 rounded-lg font-bold text-lg transition-all ${
                words.length === 0
                  ? 'bg-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              }`}
            >
              {isAnimating ? 'Consulting the Storm...' : 'Call Upon the Storm'}
            </button>

            {selectedWord && (
              <div className={`mt-6 text-2xl font-bold ${isAnimating ? 'animate-pulse' : ''}`}>
                {selectedWord}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPicker;