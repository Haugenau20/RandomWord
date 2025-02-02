import React from 'react';
import { Zap, MessageCircle } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Gauthak's Toolbox</h1>
          <p className="text-slate-400 text-lg">Choose your adventure...</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <button
            onClick={() => onNavigate('javelin')}
            className="p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-xl hover:from-blue-700 hover:to-blue-900 transition-all group"
          >
            <div className="flex flex-col items-center gap-4">
              <Zap className="w-12 h-12 text-yellow-400 group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-2">Javelin of Lightning</h2>
                <p className="text-blue-100">Command your lightning javelin with ancient words of power</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('catchphrase')}
            className="p-6 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-xl hover:from-purple-700 hover:to-purple-900 transition-all group"
          >
            <div className="flex flex-col items-center gap-4">
              <MessageCircle className="w-12 h-12 text-purple-200 group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-2">Catchphrases</h2>
                <p className="text-purple-100">Create and manage your signature catchphrases</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;