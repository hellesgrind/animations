import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import './index.css';

const App: React.FC = () => {
  const [animations, setAnimations] = useState<any[]>([]);
  
  useEffect(() => {
    // Загружаем все 13 JSON файлов с анимациями
    const loadAnimations = async () => {
      const animationFiles = [];
      for (let i = 1; i <= 13; i++) {
        try {
          // Используем fetch для загрузки JSON данных
          const response = await fetch(`/gift_carousel/${i}.json`);
          const animationData = await response.json();
          animationFiles.push(animationData);
        } catch (error) {
          console.error(`Не удалось загрузить анимацию ${i}:`, error);
        }
      }
      
      // Дублируем анимации для бесконечного эффекта
      setAnimations([...animationFiles, ...animationFiles]);
    };
    
    loadAnimations();
  }, []);
  
  return (
    <div className="app-container">
      {/* Плавающие элементы фона */}
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
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
          }}> Покупай паки - получай подарки</span> 🎁
        </h1>
      </div>
      
      <div className="carousel-container">
        <motion.div 
          className="carousel"
          animate={{ x: [-1500, 0] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear"
          }}
        >
          {animations.map((animation, index) => (
            <div className="animation-item" key={index}>
              <Lottie 
                animationData={animation} 
                loop={true}
                style={{ width: 250, height: 250 }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
