// Spells.jsx
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import LightningOverlay from './LightningOverlay';

const Spells = ({ onBack }) => {
  const presetPhrases = {
    'Wrath of the Storm': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Cure Wounds': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Shatter': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Call Lightning': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Spirit Guardians': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Revivify': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Lesser Restoration': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Thunderwave': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Channel Divinity': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Remove Curse': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ],
    'Dispel Magic': [
      "Placeholder phrase 1",
      "Placeholder phrase 2",
      "Placeholder phrase 3"
    ]
  };

  const [selectedSpell, setSelectedSpell] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [customPhrases, setCustomPhrases] = useState(() => {
    const savedPhrases = localStorage.getItem('spellPhrases');
    return savedPhrases ? JSON.parse(savedPhrases) : {};
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('spellPhrases', JSON.stringify(customPhrases));
  }, [customPhrases]);

  const pickRandomPhrase = (spell) => {
    const spellPhrases = [...(presetPhrases[spell] || []), ...(customPhrases[spell] || [])];
    if (!spellPhrases.length) return;
    
    setIsAnimating(true);
    setSelectedSpell(spell);
    
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      const randomPhrase = spellPhrases[Math.floor(Math.random() * spellPhrases.length)];
      setSelectedPhrase(randomPhrase);
      flashCount++;
      
      if (flashCount >= 10) {
        clearInterval(flashInterval);
        setIsAnimating(false);
      }
    }, 100);
  };

  const handleAddPhrase = () => {
    if (input.trim() && selectedSpell) {
      setCustomPhrases(prev => ({
        ...prev,
        [selectedSpell]: [...(prev[selectedSpell] || []), input.trim()]
      }));
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddPhrase();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <LightningOverlay isAnimating={isAnimating} />
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
            <Sparkles className="text-purple-400" />
            Spell Catchphrases
          </h1>
        </div>

        {/* Spells Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {Object.keys(presetPhrases).map((spell) => (
            <button
              key={spell}
              onClick={() => pickRandomPhrase(spell)}
              disabled={isAnimating}
              className="p-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg 
                       hover:from-purple-700 hover:to-purple-900 transition-all
                       text-white font-medium text-left"
            >
              {spell}
              <div className="text-sm text-purple-200 mt-1">
                {((presetPhrases[spell] || []).length + (customPhrases[spell] || []).length)} phrases
              </div>
            </button>
          ))}
        </div>

        {/* Selected Phrase Display */}
        {selectedPhrase && (
          <div className={`mb-6 p-6 bg-slate-800 rounded-lg text-center ${isAnimating ? 'animate-pulse' : ''}`}>
            <h3 className="text-lg text-purple-400 mb-2">{selectedSpell}:</h3>
            <p className="text-2xl font-bold text-white">{selectedPhrase}</p>
          </div>
        )}

        {/* Custom Phrase Input */}
        {selectedSpell && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Add Custom Phrase for {selectedSpell}:
            </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your spell phrase..."
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
              />
              <button
                onClick={handleAddPhrase}
                className="w-full sm:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition-colors"
              >
                Add Phrase
              </button>
            </div>

            {/* Custom Phrases List */}
            {customPhrases[selectedSpell]?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg text-white mb-2">Your Custom Phrases:</h3>
                <div className="flex flex-col gap-2">
                  {customPhrases[selectedSpell].map((phrase, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center px-4 py-2 bg-slate-700 rounded-lg"
                    >
                      <span className="text-white">{phrase}</span>
                      <button
                        onClick={() => {
                          setCustomPhrases(prev => ({
                            ...prev,
                            [selectedSpell]: prev[selectedSpell].filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-slate-400 hover:text-red-400 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spells;