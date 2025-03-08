import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import './index.css';

const App: React.FC = () => {
  const [animation, setAnimation] = useState<any>(null);
  
  useEffect(() => {
    // Load the hat animation
    const loadAnimation = async () => {
      try {
        const response = await fetch('/gifts/hat.json');
        const animationData = await response.json();
        setAnimation(animationData);
      } catch (error) {
        console.error('Failed to load hat animation:', error);
      }
    };
    
    loadAnimation();
  }, []);
  
  return (
    <div className="app-container">
      {/* Floating background particles */}
      <div className="floating-bg">
        <div className="float-up">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`up-${i}`} 
              className="bg-circle"
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
        <div className="float-down">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`down-${i}`} 
              className="bg-circle"
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
      
      <div className="content-container">
        <div className="gift-card">
          <div className="limited-badge">limited</div>
          <div className="lottie-container">
            {animation && (
              <Lottie 
                animationData={animation} 
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          
          <div className="medal">
            <div className="medal-ribbon"></div>
            <div className="medal-circle">
              <span>1</span>
            </div>
          </div>
          
          <div className="points-badge">
            <span className="star">★</span>
            <span className="points-value">1000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
