import React from 'react';

const JavelinOverlay = ({ isAnimating }) => {
  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main SVG container */}
      <svg className="w-full h-full absolute" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {/* Initial Javelin */}
        <path
          className="javelin-path"
          d="M10,50 L30,50"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
          style={{
            animation: 'javelinTransform 0.3s ease-out forwards'
          }}
        />
        
        {/* Main Lightning Bolt */}
        <path
          className="lightning-main"
          d="M30,50 L45,50 L40,45 L55,50 L50,55 L65,50 L90,50"
          stroke="#4AF7FF"
          strokeWidth="2"
          fill="none"
          style={{
            animation: 'lightningExtend 0.5s ease-out forwards'
          }}
        />
        
        {/* Lightning Branches */}
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            className="lightning-branch"
            d={`M${40 + i * 10},50 L${35 + i * 10},${45 + (i % 2) * 10}`}
            stroke="rgba(74, 247, 255, 0.6)"
            strokeWidth="1"
            fill="none"
            style={{
              animation: `branchFlash 0.2s ease-out forwards ${i * 0.1}s`
            }}
          />
        ))}
        
        {/* Energy Particles */}
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            className="energy-particle"
            cx={30 + Math.random() * 60}
            cy={48 + Math.random() * 4}
            r="0.5"
            fill="#4AF7FF"
            style={{
              animation: `particleFloat 0.5s ease-out forwards ${Math.random() * 0.5}s`
            }}
          />
        ))}
      </svg>
      
      {/* Radial Glow Effect */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-blue-500/20 to-transparent"
        style={{
          animation: 'glowPulse 0.5s ease-out forwards',
        }}
      />
    </div>
  );
};

export default JavelinOverlay;