import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowLeft, Swords, Navigation, Skull, Cloud, Sparkles } from 'lucide-react';
import LightningOverlay from './LightningOverlay';

const CatchPhrase = ({ onBack }) => {
  const presetPhrases = {
    'Entering battle': [
      "Torden kalder, og jeg svarer!",
      "Lad storm og stål synge sammen!",
      "Thor's vrede er min styrke!",
      "Som lynet slår, således gør jeg!",
      "Arena eller slagmark - sejren er min!",
      "Mærk naturens vrede!",
      "Storm i blodet, torden i sjælen!",
      "Jeg er stormen der kommer!",
      "Lad kampens torden rulle!",
      "Fra arenakæmper til Thors hammer!"
    ],
    'Dealing damage in battle': [
      "Smag tordengudens kraft!",
      "Dette er mere end gladiatorkraft!",
      "Lad lynet tale!",
      "Mærk naturens dom!",
      "Thor's hammer knuser dig!",
      "Storm og stål bliver ét!",
      "Dette er ægte tordenkraft!",
      "Føl himlens vrede!",
      "Ingen kæder kan holde denne storm!",
      "Din skæbne er forseglet af lynet!"
    ],
    'Traveling between places': [
      "Vinden viser vejen fremad!",
      "Stormens børn vandrer altid!",
      "Hvor tordenen går, følger jeg!",
      "Fri som stormen selv!",
      "Ingen lænker holder mig længere!",
      "Ad tordnens veje går vi!",
      "Lad rejsen være som vinden - ustoppelig!",
      "Thor's ånd leder os frem!",
      "Stormens kraft driver os fremad!",
      "Fri til at vandre, fri til at kæmpe!"
    ],
    'Entering dark and gloomy places': [
      "Selv mørket frygter tordenen!",
      "Lad lynet oplyse vores vej!",
      "Thor's lys vil guide os!",
      "Mørket kan ikke gemme sig for storm!",
      "Selv huler ryster når torden kommer!",
      "Lad stormen rense dette sted!",
      "Mørket møder sin overmand!",
      "Tordenkraft kender ingen grænser!",
      "Her kommer naturens vrede!",
      "Dybet skal kende min styrke!"
    ],
    'Misc': [
      "Frihed er som en storm - utæmmelig!",
      "En gladiators ære dør aldrig!",
      "Thor's vilje er min styrke!",
      "Stormens børn frygter intet!",
      "Fra lænker til lynild!",
      "Vejret følger min sjæls kald!",
      "En fri storm kan ikke stoppes!",
      "Thor's latter er i tordenen!",
      "Naturens kraft løb i mine årer!",
      "Stormens arv er min at bære!"
    ]
  };

  const categoryIcons = {
    'Entering battle': Swords,
    'Dealing damage in battle': Cloud,
    'Traveling between places': Navigation,
    'Entering dark and gloomy places': Skull,
    'Misc': Sparkles
  };

  const [phrases, setPhrases] = useState(() => {
    const savedPhrases = localStorage.getItem('catchphrases');
    return savedPhrases ? JSON.parse(savedPhrases) : [];
  });
  const [input, setInput] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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

  const pickRandomPhraseFromCategory = (category) => {
    const categoryPhrases = presetPhrases[category];
    if (!categoryPhrases || categoryPhrases.length === 0) return;
    
    setIsAnimating(true);
    setSelectedCategory(category);
    
    let flashCount = 0;
    const flashInterval = setInterval(() => {
      const randomPhrase = categoryPhrases[Math.floor(Math.random() * categoryPhrases.length)];
      setSelectedPhrase(randomPhrase);
      flashCount++;
      
      if (flashCount >= 10) {
        clearInterval(flashInterval);
        setIsAnimating(false);
      }
    }, 100);
  };

  const pickRandomFromCustom = () => {
    if (phrases.length === 0) return;
    
    setIsAnimating(true);
    setSelectedCategory('Custom Phrases');
    
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
    if (window.confirm('Are you sure you want to clear all custom catchphrases?')) {
      setPhrases([]);
      setSelectedPhrase('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <LightningOverlay isAnimating={isAnimating} />
      <div className="container mx-auto max-w-2xl px-4 py-6 relative z-10">
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

        {/* Preset Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Choose Your Moment:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(presetPhrases).map(([category, _]) => {
              const IconComponent = categoryIcons[category];
              return (
                <button
                  key={category}
                  onClick={() => pickRandomPhraseFromCategory(category)}
                  disabled={isAnimating}
                  className="p-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg 
                           hover:from-purple-700 hover:to-purple-900 transition-all
                           flex items-center gap-3 text-white font-medium"
                >
                  <IconComponent className="w-5 h-5" />
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phrase Display */}
        {selectedPhrase && (
          <div className={`mb-6 p-6 bg-slate-800 rounded-lg text-center ${isAnimating ? 'animate-pulse' : ''}`}>
            <h3 className="text-lg text-purple-400 mb-2">{selectedCategory}:</h3>
            <p className="text-2xl font-bold text-white">{selectedPhrase}</p>
          </div>
        )}

        {/* Custom Phrases Section */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Custom Phrases:</h2>
          
          {/* Input Section */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your catchphrase..."
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
          {phrases.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg text-white">Your Phrases:</h3>
                <button
                  onClick={clearAllPhrases}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {phrases.map((phrase, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-2 bg-slate-700 rounded-lg"
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

              <button
                onClick={pickRandomFromCustom}
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
                         hover:from-purple-700 hover:to-pink-700 text-white rounded font-medium transition-colors"
              >
                Pick Random Custom Phrase
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatchPhrase;