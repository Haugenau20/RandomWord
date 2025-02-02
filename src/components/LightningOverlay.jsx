import React from 'react';

const LightningOverlay = ({ isAnimating }) => {
  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="w-full h-full absolute" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Left Lightning */}
        <path
          className="lightning-path"
          d="M30,0 L35,25 L25,35 L40,50 L30,60 L45,85 L40,100"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="0.5"
          fill="none"
          style={{
            animation: 'lightningFlash 0.5s ease-out forwards',
            animationDelay: '0.1s'
          }}
        />
        
        {/* Center Lightning */}
        <path
          className="lightning-path"
          d="M50,0 L45,20 L55,30 L45,45 L60,60 L50,75 L55,100"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="0.5"
          fill="none"
          style={{
            animation: 'lightningFlash 0.5s ease-out forwards',
            animationDelay: '0.2s'
          }}
        />
        
        {/* Right Lightning */}
        <path
          className="lightning-path"
          d="M70,0 L65,15 L75,25 L60,40 L70,50 L55,70 L60,100"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="0.5"
          fill="none"
          style={{
            animation: 'lightningFlash 0.5s ease-out forwards',
            animationDelay: '0.3s'
          }}
        />
        
        {/* Additional lightning branches */}
        <path
          className="lightning-branch"
          d="M35,25 L20,30"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.3"
          fill="none"
        />
        <path
          className="lightning-branch"
          d="M55,30 L70,35"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="0.3"
          fill="none"
        />
      </svg>
      
      {/* Radial gradient flash effect */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent"
        style={{
          animation: 'fadeOut 1s ease-out forwards',
        }}
      />
      
      {/* Lightning particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="lightning-particle absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particleFade 0.5s ease-out forwards ${Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LightningOverlay;