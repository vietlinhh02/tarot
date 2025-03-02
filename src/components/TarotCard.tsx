"use client";

import { useState, useEffect } from 'react';

interface TarotCardProps {
  card: {
    id: number;
    name: string;
    description: string;
    meaning: {
      upright: string;
      reversed: string;
    };
  };
  position: {
    id: string;
    name: string;
  };
  isReversed: boolean;
  isRevealed: boolean;
}

const TarotCard = ({ card, position, isReversed, isRevealed }: TarotCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isRevealed]);

  // Tạo màu nền đơn sắc dựa trên ID của lá bài
  const getCardColor = () => {
    // Major Arcana: 0-21 - Màu tím đậm
    if (card.id >= 0 && card.id <= 21) {
      return 'bg-purple-700 border-purple-400'; // Adjusted for better contrast
    }
    // Cups: 22-35 (nước - màu xanh dương)
    else if (card.id >= 22 && card.id <= 35) {
      return 'bg-blue-600 border-blue-400'; // Adjusted for better contrast
    }
    // Swords: 36-49 (không khí - màu vàng/cam)
    else if (card.id >= 36 && card.id <= 49) {
      return 'bg-amber-500 border-amber-400'; // Adjusted for better contrast
    }
    // Wands: 50-63 (lửa - màu đỏ)
    else if (card.id >= 50 && card.id <= 63) {
      return 'bg-red-600 border-red-400'; // Adjusted for better contrast
    }
    // Pentacles: 64-77 (đất - màu xanh lá)
    else {
      return 'bg-emerald-600 border-emerald-400'; // Adjusted for better contrast
    }
  };

  // Lấy biểu tượng dựa trên ID
  const getCardSymbol = () => {
    if (card.id >= 0 && card.id <= 21) return '✨';
    if (card.id >= 22 && card.id <= 35) return '🌊';
    if (card.id >= 36 && card.id <= 49) return '🌬️';
    if (card.id >= 50 && card.id <= 63) return '🔥';
    return '🌿'; // Changed Pentacles to a leaf for better visual representation
  };

  // Lấy số/ký hiệu của lá bài
  const getCardNumber = () => {
    if (card.id >= 0 && card.id <= 21) {
        return card.id; // Major Arcana: Use ID (0-21)
    }

    const suitStartIds = [22, 36, 50, 64]; // Starting IDs for Cups, Swords, Wands, Pentacles
    for (const startId of suitStartIds) {
      if (card.id >= startId && card.id <= startId + 13) {
           const cardValue = (card.id - startId + 1);
            //convert to roman numerals
            const roman = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
            if (cardValue <=10) return roman[cardValue - 1];
            if(cardValue === 11) return "P";
            if(cardValue === 12) return "Kn";
            if(cardValue === 13) return "Q";
            if(cardValue === 14) return "K";
      }
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center w-40 mx-auto">  {/* Tăng kích thước từ w-32 lên w-40 */}
      <h3 className="text-sm font-bold mb-2 text-mystic shadow-text tracking-wide uppercase text-center w-full truncate">
        {position.name}
      </h3>

      {!isRevealed ? (
        // Hiển thị điểm chấm hỏi khi chưa lật bài
        <div className="w-full h-60 rounded-lg flex items-center justify-center bg-gray-800 border border-white border-opacity-30 shadow-lg">
          {/* Tăng chiều cao từ h-44 lên h-60 */}
          <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center shadow-md pulse-glow">
            {/* Tăng kích thước biểu tượng dấu hỏi */}
            <span className="text-2xl text-white font-bold">?</span>
          </div>
        </div>
      ) : (
        // Hiển thị thông tin lá bài khi đã lật
        <div className={`w-full h-60 rounded-lg overflow-hidden shadow-lg ${getCardColor()} transition-all duration-500 ease-in-out relative border-3`}>
          {/* Tăng chiều cao từ h-44 lên h-60 và border từ border-2 lên border-3 */}
          <div className="flex flex-col items-center h-full justify-between p-3">
            {/* Tăng padding từ p-2 lên p-3 */}
            {/* Tên lá bài phần trên */}
            <div className="text-center w-full flex justify-between items-center">
              <h4 className="font-bold uppercase truncate text-white text-sm">
                {/* Tăng kích thước text từ text-xs lên text-sm */}
                {card.name}
              </h4>
              <p className="text-white text-sm">{getCardNumber()}</p>
              {/* Tăng kích thước text */}
            </div>

            <div className="w-full h-[1px] bg-white bg-opacity-50 my-2"></div>
            {/* Tăng margin y */}
            <p className="text-[10px] tracking-wide text-white text-center">
                {/* Tăng kích thước text từ text-[8px] lên text-[10px] */}
                {isReversed ? 'REVERSED' : 'UPRIGHT'}
                <span className="inline-block ml-1 text-[10px] font-bold">{isReversed ? '↓' : '↑'}</span>
            </p>

            {/* Hình ảnh minh họa ở giữa */}
            <div className="flex-grow flex items-center justify-center my-2">
              {/* Tăng margin y */}
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                {/* Tăng kích thước hình tròn từ w-14 h-14 lên w-20 h-20 */}
                <span className="text-3xl opacity-90">{getCardSymbol()}</span>
                {/* Tăng kích thước biểu tượng */}
              </div>
            </div>

            {/* Mô tả ngắn gọn ở phần dưới */}
            <div className="mb-1 text-center w-full">
              <div className="w-full p-2 bg-black bg-opacity-50 rounded-md">
                {/* Tăng padding */}
                <p className="text-[10px] line-clamp-2 font-medium text-white">
                  {/* Tăng kích thước text */}
                  {isReversed
                    ? card.meaning.reversed.split(',')[0]
                    : card.meaning.upright.split(',')[0]}
                </p>
              </div>
            </div>
          </div>
          {/* Overlay for subtle gloss effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 rounded-lg pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default TarotCard; 