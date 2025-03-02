import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const prizes = [
  { 
    place: 2, 
    emoji: '🥈', 
    animation: '/gifts/tie.json', 
    limit: '1 из 100K',
    zIndex: 10,
    transform: 'translateX(-30px) translateY(20px) scale(0.9)'
  },
  { 
    place: 1, 
    emoji: '🥇', 
    animation: '/gifts/hat.json', 
    limit: '1 из 40K',
    zIndex: 20,
    transform: 'translateY(-20px) scale(1.05)'
  },
  { 
    place: 3, 
    emoji: '🥉', 
    animation: '/gifts/lamp.json', 
    limit: '1 из 300K',
    zIndex: 10,
    transform: 'translateX(30px) translateY(20px) scale(0.9)'
  }
];

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-[300%] animate-float-up">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`up-${i}`} 
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 50 + 10}px`,
                height: `${Math.random() * 50 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-[300%] animate-float-down">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`down-${i}`} 
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 50 + 10}px`,
                height: `${Math.random() * 50 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-row items-center justify-center gap-8 px-8 py-4 w-full max-w-5xl">
        {prizes.map((prize) => (
          <div 
            key={prize.place}
            className="relative bg-gray-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center w-1/3 aspect-[3/4] overflow-hidden"
            style={{ 
              zIndex: prize.zIndex, 
              transform: prize.transform,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            {/* Corner ribbon for limit - larger text */}
            <div className="absolute top-0 right-0 overflow-hidden w-40 h-40">
              <div 
                className="bg-indigo-600 text-white font-bold py-3 px-4"
                style={{
                  position: 'absolute',
                  top: 20,
                  right: -45,
                  transform: 'rotate(45deg)',
                  width: '190px',
                  textAlign: 'center',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                  fontSize: '1.3rem',
                  fontWeight: 'bold'
                }}
              >
                {prize.limit}
              </div>
            </div>
            
            {/* Animation - further reduced size to make more room for emoji */}
            <div className="flex-1 flex items-center justify-center w-full">
              <Player
                autoplay
                loop
                src={prize.animation}
                style={{ height: '65%', width: '65%' }}
              />
            </div>
            
            {/* Place indicator - even larger emoji medal */}
            <div className="mt-auto mb-4 flex justify-center w-full">
              <div 
                className="drop-shadow-lg" 
                style={{ 
                  fontSize: 'min(6.5rem, 40vw)', 
                  lineHeight: '0.9',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6))'
                }}
              >
                {prize.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
