"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { tarotCards } from '../data/tarotCards';

interface TarotSelectorProps {
  selectedCards: number[];
  onSelectCard: (cardId: number) => void;
  maxSelections: number;
}

const TarotSelector = ({ selectedCards, onSelectCard, maxSelections }: TarotSelectorProps) => {
  // Tạo danh sách tất cả các lá bài (78 lá)
  const [shuffledCards, setShuffledCards] = useState<typeof tarotCards>([]);
  const [isShuffling, setIsShuffling] = useState(true);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  // Tạo ref để lưu vị trí ngẫu nhiên cho mỗi lá bài
  const randomPositionsRef = useRef<{[key: number]: {rotate: number, offsetX: number, offsetY: number}}>({});
  
  // Tạo vị trí ngẫu nhiên cho các lá bài
  const generateRandomPositions = (cards: typeof tarotCards) => {
    const positions: {[key: number]: {rotate: number, offsetX: number, offsetY: number}} = {};
    cards.forEach(card => {
      positions[card.id] = {
        rotate: Math.random() * 20 - 10, // Xoay ngẫu nhiên -10 đến 10 độ
        offsetX: Math.random() * 15 - 7.5, // Dịch ngang ngẫu nhiên -7.5px đến 7.5px
        offsetY: Math.random() * 15 - 7.5 // Dịch dọc ngẫu nhiên -7.5px đến 7.5px
      };
    });
    randomPositionsRef.current = positions;
  };
  
  // Xáo trộn bài khi component được tạo
  useEffect(() => {
    // Đảm bảo rằng chúng ta có dữ liệu lá bài
    console.log("Số lượng lá bài:", tarotCards.length);
    
    const shuffleCards = () => {
      setIsShuffling(true);
      
      // Animation xáo bài
      let iterations = 0;
      const maxIterations = 5; // Giảm số lần xáo trộn
      const interval = setInterval(() => {
        const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
        setShuffledCards(shuffled);
        
        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(interval);
          setIsShuffling(false);
          // Tạo vị trí ngẫu nhiên cho các lá bài
          generateRandomPositions(shuffled);
        }
      }, 300);
      
      return () => clearInterval(interval);
    };
    
    shuffleCards();
  }, []);
  
  // Xử lý khi người dùng click vào lá bài
  const handleCardClick = (cardId: number) => {
    // Hiển thị tên lá bài đã chọn
    if (!revealedCards.includes(cardId)) {
      setRevealedCards(prev => [...prev, cardId]);
    }
    
    if (selectedCards.includes(cardId)) {
      // Nếu lá bài đã được chọn, bỏ chọn nó
      onSelectCard(cardId);
    } else if (selectedCards.length < maxSelections) {
      // Chọn lá bài nếu chưa đạt tối đa
      onSelectCard(cardId);
    }
  };
  
  // Xáo bài lại và xóa các lựa chọn
  const handleReshuffle = () => {
    // Xóa tất cả các lá bài đã chọn
    selectedCards.forEach(cardId => {
      onSelectCard(cardId); // Gọi onSelectCard cho mỗi lá bài đã chọn để bỏ chọn nó
    });
    
    setIsShuffling(true);
    setRevealedCards([]);
    
    // Animation xáo bài
    let iterations = 0;
    const maxIterations = 5;
    const interval = setInterval(() => {
      const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsShuffling(false);
        // Tạo vị trí ngẫu nhiên mới cho các lá bài
        generateRandomPositions(shuffled);
      }
    }, 300);
  };
  
  // Xóa tất cả lựa chọn mà không xáo bài
  const handleClearSelections = () => {
    // Xóa tất cả các lá bài đã chọn
    selectedCards.forEach(cardId => {
      onSelectCard(cardId); // Gọi onSelectCard cho mỗi lá bài đã chọn để bỏ chọn nó
    });
  };
  
  // Đường dẫn ảnh mặt sau lá bài
  const cardBackImagePath = "/images/v743-tang-22.jpg";
  
  // Debug đường dẫn ảnh
  useEffect(() => {
    console.log("Đường dẫn ảnh:", cardBackImagePath);
    // Log khi component được render
    console.log("TarotSelector rendered, shuffled cards:", shuffledCards.length);
  }, [shuffledCards.length]);
  
  if (isShuffling) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative w-40 h-60 mb-8 bg-purple-900 rounded-lg shadow-lg border-2 border-purple-700">
          <img 
            src={cardBackImagePath} 
            alt="Tarot Back" 
            className="absolute inset-0 w-full h-full object-cover opacity-90 animate-shuffle-1" 
          />
        </div>
        <p className="text-xl text-center animate-pulse">Đang xáo bài...</p>
      </div>
    );
  }
  
  // Kiểm tra xem có lá bài nào sau khi xáo trộn
  if (shuffledCards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-red-400">Không thể tải dữ liệu lá bài. Vui lòng làm mới trang.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-accent bg-opacity-40 hover:bg-opacity-60 rounded-md transition-all"
        >
          Làm mới trang
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold mb-2">Chọn {maxSelections} lá bài ({selectedCards.length}/{maxSelections})</h3>
        <p className="text-mystic">Bấm vào lá bài bạn muốn chọn</p>
        <button 
          onClick={handleReshuffle}
          className="mt-4 px-4 py-2 bg-accent bg-opacity-40 hover:bg-opacity-60 rounded-md transition-all"
        >
          Xáo bài lại
        </button>
      </div>
      
      {/* Debug - hiển thị đường dẫn ảnh và số lượng lá bài */}
      <div className="text-center text-white opacity-70 mb-4">
        <p>Số lá bài hiển thị: {shuffledCards.length}</p>
        <p className="text-xs opacity-50">Ảnh bài: {cardBackImagePath}</p>
      </div>
      
      {/* Hiển thị tất cả các lá bài */}
      <div className="flex flex-wrap justify-center gap-3 pb-8 relative min-h-[300px]">
        {shuffledCards.map((card, index) => {
          const isSelected = selectedCards.includes(card.id);
          const randomPosition = randomPositionsRef.current[card.id] || { rotate: 0, offsetX: 0, offsetY: 0 };
          
          return (
            <div 
              key={card.id} 
              className={`
                relative cursor-pointer overflow-hidden rounded-lg border-2 
                transition-all duration-300 transform
                ${isSelected ? 'border-accent shadow-lg shadow-gold/50 z-30 scale-110' : 'border-white border-opacity-30 hover:scale-105 hover:shadow-md hover:z-20'}
              `}
              style={{ 
                width: '65px', 
                height: '95px',
                transform: `rotate(${randomPosition.rotate}deg)`,
                margin: `${randomPosition.offsetY}px ${randomPosition.offsetX}px`,
                zIndex: isSelected ? 30 : 10
              }}
              onClick={() => handleCardClick(card.id)}
            >
              {/* Hiển thị ảnh lá bài */}
              <div className="relative w-full h-full bg-purple-900">
                <img 
                  src={cardBackImagePath} 
                  alt={`Card ${card.id}`} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                
                {/* Hiệu ứng overlay khi chọn lá bài */}
                {isSelected && (
                  <div className="absolute inset-0 bg-accent bg-opacity-20 flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent rounded-full z-20 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Hiển thị số lượng lá bài đã chọn */}
      {selectedCards.length > 0 && (
        <div className="mt-8 p-4 text-center">
          <h4 className="text-xl font-semibold mb-2">
            Đã chọn {selectedCards.length}/{maxSelections} lá bài
          </h4>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleClearSelections}
              className="mt-2 px-4 py-2 bg-red-500 bg-opacity-40 hover:bg-opacity-60 rounded-md transition-all"
            >
              Xóa các lựa chọn
            </button>
            <button
              onClick={handleReshuffle}
              className="mt-2 px-4 py-2 bg-purple-600 bg-opacity-40 hover:bg-opacity-60 rounded-md transition-all"
            >
              Xóa và xáo bài lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotSelector; 