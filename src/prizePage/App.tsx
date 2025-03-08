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
        const response = await fetch('/gifts/tie.json');
        const animationData = await response.json();
        setAnimation(animationData);
      } catch (error) {
        console.error('Failed to load hat animation:', error);
      }
    };
    
    loadAnimation();
  }, []);
  
  // Создаем массив частиц с разными параметрами анимации
  const particles = Array.from({ length: 30 }).map((_, i) => {
    const angle = (i * (360 / 30)) * (Math.PI / 180); // Равномерно распределяем частицы по кругу
    const distance = Math.random() * 60 + 40; // Увеличиваем расстояние разлета
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const delay = Math.random() * 1.5; // Случайная задержка для каждой частицы
    
    // Определяем начальное положение частиц ближе к краям плашки
    const startOffsetX = Math.cos(angle) * 30; // Смещение от центра к краям
    const startOffsetY = Math.sin(angle) * 15; // Меньшее смещение по вертикали
    
    return {
      id: i,
      style: {
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        animationDelay: `${delay}s`,
        left: `calc(50% + ${startOffsetX}px)`,
        top: `calc(50% + ${startOffsetY}px)`,
        marginLeft: '-10px',
        marginTop: '-10px',
      } as React.CSSProperties,
    };
  });
  
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
      
      <div className="header-container">
        <h1 className="title">
          <span style={{
            background: 'linear-gradient(to right, #fbcfe8, #ffffff, #fbcfe8)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            display: 'block'
          }}>Больше паков - больше шанс выйграть!</span>
        </h1>
      </div>
      
      <div className="content-container">
        <div className="gift-card">
          {/* Limited ribbon */}
          <div className="limited-ribbon">
            <div className="limited-ribbon-content">limited</div>
          </div>
          
          <div className="lottie-container">
            {animation && (
              <Lottie 
                animationData={animation} 
                loop={true}
                style={{ width: 200, height: 200 }}
              />
            )}
          </div>
          <div className="points-badge">
            {/* Частицы */}
            {particles.map(particle => (
              <div 
                key={particle.id} 
                className="particle" 
                style={particle.style}
              />
            ))}
            <span className="star"></span>
            <span className="points-value">300</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
