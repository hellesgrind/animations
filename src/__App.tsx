import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const IMAGES = [
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.png',
  '/5.png',
  '/6.png',
  '/7.png',
  '/8.png',
  '/9.png',
];
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled;
  // return shuffled.slice(0, Math.floor(shuffled.length / 2));
};
const IMAGES_GALLERY = shuffleArray([
  'generations/gen1.jpg',
  // 'generations/gen2.jpg',
  'generations/gen3.jpg',
  // 'generations/gen4.jpg',
  'generations/gen5.jpg',
  // 'generations/gen6.jpg',
  'generations/gen7.jpg',
  // 'generations/gen8.jpg',
  'generations/gen9.jpg',
  'generations/gen10.jpg',
  // 'generations/gen11.jpg',
  'generations/gen12.jpg',
  // 'generations/gen13.jpg',
  'generations/gen14.jpg',
  // 'generations/gen15.jpg',
  'generations/gen16.jpg',
  'generations/gen17.jpg',
  // 'generations/gen18.jpg',
  // 'generations/gen19.jpg',
  'generations/gen20.jpg',
  // 'generations/gen21.jpg',
  'generations/gen22.jpg',
  // 'generations/gen23.jpg',
  'generations/gen24.jpg',
  'generations/gen25.jpg',
  // 'generations/gen26.jpg',
  'generations/gen27.jpg',
  // 'generations/gen28.jpg',
  'generations/gen29.jpg',
  'generations/gen30.jpg',
  // 'generations/gen31.jpg',
])

const TEXT_SEQUENCE = [
  { text: "Imagine <highlight>yourself</highlight>", duration: 3000 },
  { text: "In <highlight>different styles</highlight>, images and settings", duration: 3000 },
  { text: "Upload <highlight>your</highlight> selfies", duration: 3000 },
  { text: "And generate <highlight>realistic AI images</highlight> of yourself!", duration: 3000 },
  { text: "Start generating <highlight>stunning AI photos</highlight> now!", duration: 3000 }
];

// Update Screen type
type Screen = 'promo' | 'gallery' | 'compare' | 'modes';

const CONFIG = {
  showScreen: 'modes' as Screen
};

function Logo() {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
      <div className="animate-fade-in bg-black/70 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/10">
        <h1 className="text-4xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            LiterallyMe
          </span>
          <Sparkles className="inline-block w-8 h-8 ml-1 text-yellow-400 animate-pulse" />
        </h1>
        <p className="text-lg font-medium text-gray-300 mt-1 tracking-wider">
          AI Фотограф
        </p>
      </div>
    </div>
  );
}

function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TEXT_SEQUENCE.length);
        setIsVisible(true);
      }, 200);
    }, TEXT_SEQUENCE[currentIndex].duration);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const highlightStyles = [
    'bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent',
    'bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent',
    'bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent',
    'bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent',
    'bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'
  ];

  const renderText = (text: string, highlightStyle: string) => {
    return text.split(/(<highlight>.*?<\/highlight>)/).map((part, index) => {
      if (part.startsWith('<highlight>')) {
        const highlightedText = part.replace(/<highlight>|<\/highlight>/g, '');
        return <span key={index} className={highlightStyle}>{highlightedText}</span>;
      }
      return part;
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className={`transition-all duration-300 w-full max-w-4xl px-8 flex justify-center ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className={`bg-black/80 backdrop-blur-md rounded-2xl p-12 shadow-2xl border border-white/10`}>
          <h1 className="text-3xl font-bold text-white text-center whitespace-pre-line">
            {renderText(TEXT_SEQUENCE[currentIndex].text, highlightStyles[currentIndex])}
          </h1>
        </div>
      </div>
    </div>
  );
}

function PhotoColumn({ direction, offset = 0 }: { direction: 'up' | 'down'; offset?: number }) {
  const images = [...IMAGES, ...IMAGES, ...IMAGES];
  const animationClass = direction === 'up' ? 'animate-float-up' : 'animate-float-down';
  const translateY = offset ? `translateY(${offset}%)` : 'translateY(0)';

  return (
    <div 
      className={`flex flex-col gap-4 ${animationClass}`}
      style={{ transform: translateY }}
    >
      {images.map((img, index) => (
        <div
          key={index}
          className="w-full aspect-[3/4] rounded-2xl overflow-hidden"
        >
          <img
            src={`${img}?w=400&h=533&auto=format&fit=crop`}
            alt={`Landscape ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function PromoScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black overflow-hidden relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <Logo />
      <AnimatedText />
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-0">
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-6rem)]">
          <PhotoColumn direction="up" />
          <PhotoColumn direction="down" offset={-33.33} />
          <PhotoColumn direction="up" offset={-66.66} />
        </div>
      </div>
    </div>
  );
}

function GalleryScreen() {
  const [upperImages, lowerImages] = IMAGES_GALLERY.reduce((acc, img, index) => {
    if (index < IMAGES_GALLERY.length / 2) {
      acc[0].push(img);
    } else {
      acc[1].push(img);
    }
    return acc;
  }, [[], []]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-black overflow-hidden relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <Logo />
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-0 mt-24">
        <div className="flex flex-col gap-8">
          <div className="animate-slide-left flex gap-4">
            {[...upperImages, ...upperImages].map((img, index) => (
              <div key={index} className="w-72 aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden">
                <img
                  src={`${img}?w=400&h=533&auto=format&fit=crop`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="animate-slide-right flex gap-4">
            {[...lowerImages, ...lowerImages].map((img, index) => (
              <div key={index} className="w-72 aspect-[3/4] flex-shrink-0 rounded-2xl overflow-hidden">
                <img
                  src={`${img}?w=400&h=533&auto=format&fit=crop`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareScreen() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black overflow-hidden relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <div className="animate-fade-in bg-black/70 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            Загрузи фото и генерируй невероятные AI фотографии
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-0 mt-24">
        <div className="flex items-center justify-center gap-16">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-60 aspect-square rounded-xl overflow-hidden shadow-lg shadow-purple-500/20 border border-white/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300">
                <img
                  src={`photo_examples/${i}.jpg`}
                  alt={`Source ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="text-white bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full shadow-lg shadow-purple-500/30 hover:scale-110 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7l7 7-7 7"/>
            </svg>
          </div>

          <div className="relative w-[500px] aspect-square rounded-xl overflow-hidden shadow-2xl shadow-purple-500/20 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300">
            <img
              src="photo_examples/5.jpg"
              alt="AI Generated"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-lg">
              <p className="text-white text-xl font-medium tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">AI Фото</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModesScreen() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-black to-black overflow-hidden relative">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <div className="animate-fade-in bg-black/70 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.4)]">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            Выберите режим генерации
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-0 mt-32">
        <div className="flex items-stretch justify-center gap-16">
          {/* Готовые стили */}
          <div className="w-[500px] bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer group">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              Готовые стили
            </h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 7, 12, 18, 22, 23, 29, 30, 9].map((i) => (
                <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-white/10 hover:scale-105 transition-all duration-300">
                  <img
                    src={`generations/gen${i}.jpg`}
                    alt={`Style ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 shadow-lg text-center">
              <p className="text-white text-xl font-medium tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                Новые стили каждый месяц
              </p>
            </div>
          </div>

          {/* Творец */}
          <div className="w-[500px] bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300 cursor-pointer group">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              Творец
            </h2>
            <div className="rounded-xl overflow-hidden mb-6 shadow-lg border border-white/10">
              <img
                src="generations/gen26.jpg"
                alt="Creator Preview"
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
              <p className="text-purple-100 font-mono">
                "модель на крыше небоскреба в Нью-Йорке, закат, городской пейзаж"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  if (CONFIG.showScreen === 'promo') {
    return <PromoScreen />;
  } else if (CONFIG.showScreen === 'gallery') {
    return <GalleryScreen />;
  } else if (CONFIG.showScreen === 'compare') {
    return <CompareScreen />;
  } else if (CONFIG.showScreen === 'modes') {
    return <ModesScreen />;
  }
  return <div>Error</div>;
}

export default App;