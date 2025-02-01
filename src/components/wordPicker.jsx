import React, { useState } from 'react';
import { Cloud, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const WordPicker = () => {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

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
    
    // Create a "lightning flash" effect
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

  return (
    <Card className="w-full max-w-2xl mx-auto bg-slate-900 text-white">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Cloud className="text-blue-400" />
          Storm Oracle Word Picker
          <Zap className="text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-2 mb-6">
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors"
          >
            Add Word
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg mb-2">Words in the Storm:</h3>
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
      </CardContent>
    </Card>
  );
};

export default WordPicker;