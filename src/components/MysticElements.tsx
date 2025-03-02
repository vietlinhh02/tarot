"use client";

import React, { useState, useEffect, useMemo } from 'react';

interface ElementItem {
  id: number;
  symbol: string;
  style: React.CSSProperties;
}

interface OrbItem {
  id: number;
  style: React.CSSProperties;
}

interface MysticElementsProps {
  density?: number;
}

const MysticElements: React.FC<MysticElementsProps> = ({ density = 1 }) => {
  // Sử dụng useState với giá trị ban đầu là null để tránh hydration mismatch
  const [isClient, setIsClient] = useState(false);

  // Memoize symbols array để tránh tạo mới mỗi lần render
  const symbols = useMemo(() => [
    '✧', '★', '☽', '☾', '☀', '♅', '♆', '♇', 
    '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', 
    '♐', '♑', '♒', '♓', '✵', '✶', '✷', '✸'
  ], []);

  const [elements, setElements] = useState<ElementItem[]>([]);
  const [orbs, setOrbs] = useState<OrbItem[]>([]);

  // Tạo giá trị animation một lần duy nhất khi client-side
  const { floatAnim, pulseAnim } = useMemo(() => {
    if (!isClient) return { floatAnim: { start: 0, middle: 0 }, pulseAnim: { start: 0, end: 0, scale: 1 } };
    
    return {
      floatAnim: {
        start: Math.random() * 360,
        middle: Math.random() * 20 - 10
      },
      pulseAnim: {
        start: Math.random() * 0.1 + 0.05,
        end: Math.random() * 0.2 + 0.1,
        scale: Math.random() * 0.4 + 0.8
      }
    };
  }, [isClient]);

  // Tạo elements và orbs với useMemo chỉ khi ở client-side
  const { generatedElements, generatedOrbs } = useMemo(() => {
    if (!isClient) return { generatedElements: [], generatedOrbs: [] };
    
    const elementCount = Math.floor(10 * density);
    const orbCount = Math.floor(3 * density);

    const createElement = (index: number): ElementItem => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const size = Math.random() * 1 + 0.5;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.2 + 0.05;
      const animationDuration = Math.random() * 60 + 30;
      const animationDelay = Math.random() * -30;
      const rotate = Math.random() * 360;

      return {
        id: index,
        symbol,
        style: {
          position: 'absolute',
          top: `${top}%`,
          left: `${left}%`,
          fontSize: `${size}em`,
          opacity,
          transform: `rotate(${rotate}deg)`,
          animation: `float ${animationDuration}s infinite ease-in-out ${animationDelay}s`,
          color: 'currentColor',
          zIndex: -1,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
        }
      };
    };

    const createOrb = (index: number): OrbItem => {
      const size = Math.random() * 150 + 50;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const blur = Math.random() * 70 + 30;
      const opacity = Math.random() * 0.15 + 0.05;

      return {
        id: index,
        style: {
          position: 'absolute',
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, 
            rgba(var(--primary-light), ${opacity}) 0%, 
            rgba(var(--accent-color), ${opacity * 0.3}) 50%, 
            rgba(var(--primary-dark), 0) 70%
          )`,
          borderRadius: '50%',
          filter: `blur(${blur}px)`,
          opacity,
          zIndex: -2,
          pointerEvents: 'none',
          animation: `pulse ${Math.random() * 10 + 15}s infinite alternate ease-in-out`,
          willChange: 'transform, opacity, filter',
        }
      };
    };

    return {
      generatedElements: Array.from({ length: elementCount }, (_, i) => createElement(i)),
      generatedOrbs: Array.from({ length: orbCount }, (_, i) => createOrb(i))
    };
  }, [density, symbols, isClient]);

  // Sử dụng useEffect để đánh dấu đã render client
  useEffect(() => {
    setIsClient(true);
    
    if (isClient) {
      setElements(generatedElements);
      setOrbs(generatedOrbs);
    }

    return () => {
      setElements([]);
      setOrbs([]);
    };
  }, [generatedElements, generatedOrbs, isClient]);

  // Không render nội dung ngẫu nhiên trên server
  if (!isClient) {
    return <div className="mystic-elements"></div>;
  }

  return (
    <div className="mystic-elements">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(${floatAnim.start}deg); }
          50% { transform: translateY(${floatAnim.middle}px) rotate(${floatAnim.start + 30}deg); }
        }
        
        @keyframes pulse {
          0% { opacity: ${pulseAnim.start}; transform: scale(1); }
          100% { opacity: ${pulseAnim.end}; transform: scale(${pulseAnim.scale}); }
        }
      `}</style>
      
      {elements.map(el => (
        <div key={`symbol-${el.id}`} style={el.style}>
          {el.symbol}
        </div>
      ))}
      
      {orbs.map(orb => (
        <div key={`orb-${orb.id}`} style={orb.style} />
      ))}
    </div>
  );
};

export default MysticElements;