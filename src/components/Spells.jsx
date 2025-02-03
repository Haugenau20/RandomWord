// Spells.jsx
import React, { useState } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import LightningOverlay from './LightningOverlay';

const Spells = ({ onBack }) => {
  // Organized spells by level
  const spellsByLevel = {
    'Class Features': {
      'Channel Divinity': [
        "Ved Thors mægtige hammer, jeg påkalder din kraft!",
        "Lad tordenen være mit vidne!",
        "Guddommelig storm, hør mit kald!",
        "Ved lysets og stormens kraft, jeg kanaliserer!",
        "Thor, lad din vilje strømme gennem mig!"
      ],
      'Wrath of the Storm': [
        "Mærk himlens vrede!",
        "Tordenen er min at befale!",
        "Lad stormen straffe dig!",
        "Ved Thors lynild, brænd!",
        "Himlen selv fordømmer dig!"
      ]
    },
    'Level 1': {
      'Cure Wounds': [
        "Lad stormens styrke hele dine sår!",
        "Ved tordenens kraft, rejs dig!",
        "Thor skænker dig styrke påny!",
        "Lad regnen vaske dine sår væk!",
        "Mærk naturens helende kraft!"
      ],
      'Thunderwave': [
        "Blæs som en storm i natten!",
        "Flyv væk med vinden!",
        "Mærk presset fra min torden!",
        "Thor kaster dig tilbage!",
        "La' mig vise dig stormens kraft!"
      ]
    },
    'Level 2': {
      'Lesser Restoration': [
        "Lad tordenen rense dit sind!",
        "Ved Thors kraft, være helbredt!",
        "Stormen vasker dit sind rent!",
        "Rens som regnen efter uvejret!",
        "Lad lynet brænde dit mareridt væk!"
      ],
      'Shatter': [
        "Knust af himlens kraft!",
        "Hør tordenens sang!",
        "Splintres som glas i stormen!",
        "Mærk lydens rasende kraft!",
        "Ved Thors brøl, knuses du!"
      ]
    },
    'Level 3': {
      'Call Lightning': [
        "Thor, send din vrede!",
        "Dans, himmelske lyn!",
        "Stormens pile, find dit mål!",
        "Himlens vrede er min at kalde!",
        "Ved min hånd, lyner falder!"
      ],
      'Dispel Magic': [
        "Ved stormens kraft, forsvind!",
        "Thor nægter din magi!",
        "Blæst væk af naturens kraft!",
        "Tordenen ophæver din kunst!",
        "Ved min guds vilje, ophør!"
      ],
      'Remove Curse': [
        "Tordenen renser din forbandelse!",
        "Ved Thors hammer, være fri!",
        "Lad stormen vaske din byrde væk!",
        "Lynet brænder dine lænker!",
        "Himlen frigør dig fra mørket!"
      ],
      'Revivify': [
        "Thor nægter din død!",
        "Rejs dig ved stormens kraft!",
        "Tordenen kalder dig tilbage!",
        "Vågn ved lysets glimt!",
        "Ved himlens kraft, lev igen!"
      ],
      'Spirit Guardians': [
        "Thors krigere, beskyt os!",
        "Dans omkring mig, stormens ånder!",
        "Kæmp ved min side, himlens vogtere!",
        "Ved tordenen, omring mig!",
        "Lysets og stormens væsner, frem!"
      ]
    }
  };

  const [selectedSpell, setSelectedSpell] = useState('');
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const pickRandomPhrase = (spell) => {
    let spellPhrases = [];
    // Find the spell in the nested structure
    Object.values(spellsByLevel).forEach(levelSpells => {
      if (levelSpells[spell]) {
        spellPhrases = levelSpells[spell];
      }
    });
    
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

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <LightningOverlay isAnimating={isAnimating} />
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-cyan-400" />
            Arcane Incantations
          </h1>
        </div>

        {/* Spells Grid by Level */}
        <div className="space-y-8">
          {Object.entries(spellsByLevel).map(([level, spells]) => (
            <div key={level}>
              <h2 className="text-xl font-bold text-cyan-300 mb-4">{level}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(spells).map(([spellName, phrases]) => (
                  <button
                    key={spellName}
                    onClick={() => pickRandomPhrase(spellName)}
                    disabled={isAnimating}
                    className="p-4 bg-gradient-to-br from-cyan-600 to-blue-800 rounded-lg 
                             hover:from-cyan-500 hover:to-blue-700 transition-all
                             text-white font-medium text-left"
                  >
                    {spellName}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Phrase Display */}
        {selectedPhrase && (
          <div className={`mt-8 p-6 bg-gradient-to-r from-blue-900 to-cyan-900 rounded-lg text-center ${isAnimating ? 'animate-pulse' : ''}`}>
            <h3 className="text-lg text-cyan-400 mb-2">{selectedSpell}:</h3>
            <p className="text-2xl font-bold text-white">{selectedPhrase}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spells;