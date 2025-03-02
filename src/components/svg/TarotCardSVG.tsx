"use client";

import React from 'react';

interface TarotCardSVGProps {
  id: number;
  name: string;
  description: string;
  isReversed?: boolean;
  isCardBack?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const TarotCardSVG: React.FC<TarotCardSVGProps> = ({
  id,
  name,
  description,
  isReversed = false,
  isCardBack = false,
  className = '',
  width = 300,
  height = 500,
}) => {
  // Tạo gradient ID duy nhất cho mỗi lá bài
  const gradientId = `card-gradient-${id}`;
  const patternId = `card-pattern-${id}`;
  const textureId = `card-texture-${id}`;

  // Màu sắc dựa trên ID của lá bài
  const getCardColor = () => {
    // Major Arcana: 0-21
    if (id >= 0 && id <= 21) {
      return {
        primary: '#7B2CBF',
        secondary: '#3A0CA3',
        accent: '#FFD700',
        textColor: '#FFFFFF'
      };
    }
    // Cups: 22-35 (nước - màu xanh dương)
    else if (id >= 22 && id <= 35) {
      return {
        primary: '#0077B6',
        secondary: '#023E8A',
        accent: '#90E0EF',
        textColor: '#FFFFFF'
      };
    }
    // Swords: 36-49 (không khí - màu vàng/xám)
    else if (id >= 36 && id <= 49) {
      return {
        primary: '#FFB703',
        secondary: '#FB8500',
        accent: '#F8F9FA',
        textColor: '#000000'
      };
    }
    // Wands: 50-63 (lửa - màu đỏ/cam)
    else if (id >= 50 && id <= 63) {
      return {
        primary: '#D00000',
        secondary: '#9D0208',
        accent: '#FFBA08',
        textColor: '#FFFFFF'
      };
    }
    // Pentacles: 64-77 (đất - màu xanh lá/nâu)
    else {
      return {
        primary: '#386641',
        secondary: '#1B4332',
        accent: '#A7C957',
        textColor: '#FFFFFF'
      };
    }
  };

  const colors = getCardColor();

  // Tạo SVG cho mặt sau của lá bài
  const renderCardBack = () => (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`tarot-card-svg ${className}`}
    >
      <defs>
        <linearGradient id="backGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2C2C54" />
          <stop offset="100%" stopColor="#1F1F3A" />
        </linearGradient>
        <pattern id="cardBackPattern" patternUnits="userSpaceOnUse" width="50" height="50" patternTransform="rotate(45)">
          <rect width="50" height="50" fill="#1F1F3A" />
          <circle cx="25" cy="25" r="1" fill="#6155A6" opacity="0.8" />
          <circle cx="10" cy="10" r="1" fill="#6155A6" opacity="0.5" />
          <circle cx="40" cy="40" r="1" fill="#6155A6" opacity="0.5" />
        </pattern>
      </defs>
      
      {/* Nền lá bài */}
      <rect width={width} height={height} rx="20" fill="url(#backGradient)" />
      <rect x="10" y="10" width={width - 20} height={height - 20} rx="15" fill="url(#cardBackPattern)" />
      
      {/* Viền trang trí */}
      <rect x="20" y="20" width={width - 40} height={height - 40} rx="10" fill="none" stroke="#B990FF" strokeWidth="2" strokeDasharray="5,5" />
      
      {/* Họa tiết trang trí giữa */}
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {/* Vòng tròn trang trí */}
        <circle r="80" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.6" />
        <circle r="60" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.7" />
        <circle r="40" fill="none" stroke="#FFD700" strokeWidth="0.5" opacity="0.8" />
        
        {/* Biểu tượng trung tâm */}
        <g transform="scale(0.8)">
          <path d="M0,-50 L29,-15 L47,-41 L47,15 L29,41 L0,5 L-29,41 L-47,15 L-47,-41 L-29,-15 Z" fill="#FFD700" opacity="0.9" />
          <circle r="15" fill="#2C2C54" />
          <circle r="10" fill="none" stroke="#FFD700" strokeWidth="1" />
        </g>
      </g>
      
      {/* Họa tiết góc */}
      {[0, 90, 180, 270].map((rotate, i) => (
        <g key={i} transform={`translate(${i % 2 === 0 ? 50 : width - 50}, ${i < 2 ? 50 : height - 50})`}>
          <g transform={`rotate(${rotate})`}>
            <path d="M0,0 L20,10 L10,20 L-10,20 L-20,10 Z" fill="#FFD700" opacity="0.8" />
          </g>
        </g>
      ))}
      
      {/* Hình sao nhỏ trang trí */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 30 + Math.random() * (width - 60);
        const y = 30 + Math.random() * (height - 60);
        const size = 1 + Math.random() * 3;
        return (
          <circle key={i} cx={x} cy={y} r={size} fill="#FFD700" opacity={0.1 + Math.random() * 0.5} />
        );
      })}
    </svg>
  );

  // Tạo SVG cho mặt trước của lá bài
  const renderCardFront = () => (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`tarot-card-svg ${className}`}
      style={{ transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="30" height="30" patternTransform="rotate(45)">
          <rect width="30" height="30" fill="url(#${gradientId})" />
          <circle cx="15" cy="15" r="1" fill={colors.accent} opacity="0.5" />
        </pattern>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <pattern id={textureId} patternUnits="userSpaceOnUse" width="100" height="100">
          <rect width="100" height="100" fill="url(#${gradientId})" />
          <rect width="100" height="100" fill="#FFFFFF" fillOpacity="0.03" />
        </pattern>
      </defs>
      
      {/* Nền lá bài */}
      <rect width={width} height={height} rx="20" fill={`url(#${patternId})`} />
      <rect x="10" y="10" width={width - 20} height={height - 20} rx="15" fill={`url(#${textureId})`} />
      
      {/* Viền trang trí */}
      <rect x="20" y="20" width={width - 40} height={height - 40} rx="10" fill="none" stroke={colors.accent} strokeWidth="2" />
      
      {/* Tên lá bài */}
      <g transform={`translate(${width / 2}, 50)`}>
        <rect x="-100" y="-20" width="200" height="40" rx="20" fill={colors.secondary} />
        <text 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill={colors.textColor}
          fontFamily="serif" 
          fontSize="20" 
          fontWeight="bold"
        >
          {name.toUpperCase()}
        </text>
        <text 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill={colors.textColor}
          fontFamily="serif" 
          fontSize="14"
          y="25"
        >
          {id < 22 ? id : ''}
        </text>
      </g>
      
      {/* Biểu tượng chính */}
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {/* Biểu tượng tượng trưng theo ID của lá bài */}
        {id >= 0 && id <= 21 && (
          <g filter={`url(#glow-${id})`}>
            <circle r="60" fill="none" stroke={colors.accent} strokeWidth="2" />
            <path d={getSymbolPath(id)} fill={colors.accent} />
          </g>
        )}
        
        {id >= 22 && (
          <g>
            {/* Hiển thị biểu tượng của bộ (Cups, Wands, Swords, Pentacles) */}
            {getSuitSymbols(id, colors.accent)}
          </g>
        )}
      </g>
      
      {/* Phần mô tả */}
      <g transform={`translate(${width / 2}, ${height - 80})`}>
        <rect x="-120" y="-30" width="240" height="60" rx="10" fill={colors.secondary} fillOpacity="0.7" />
        <text 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill={colors.textColor}
          fontFamily="serif" 
          fontSize="14"
          y="-10"
        >
          {description}
        </text>
        <text 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill={colors.textColor}
          fontFamily="serif" 
          fontSize="12"
          y="10"
          fontStyle="italic"
        >
          {isReversed ? "NGƯỢC" : "XUÔI"}
        </text>
      </g>
      
      {/* Họa tiết góc */}
      {[0, 1, 2, 3].map((i) => {
        const x = i % 2 === 0 ? 30 : width - 30;
        const y = i < 2 ? 30 : height - 30;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <circle r="15" fill="none" stroke={colors.accent} strokeWidth="1.5" />
            <circle r="10" fill="none" stroke={colors.accent} strokeWidth="1" />
            <circle r="5" fill={colors.accent} />
          </g>
        );
      })}
    </svg>
  );

  // Biểu tượng cho Major Arcana dựa trên ID
  const getSymbolPath = (id: number) => {
    // Mỗi lá bài Major Arcana sẽ có biểu tượng riêng
    switch (id) {
      case 0: // The Fool
        return "M0,-30 L20,0 L0,30 L-20,0 Z";
      case 1: // The Magician
        return "M0,-40 L10,-10 L40,0 L10,10 L0,40 L-10,10 L-40,0 L-10,-10 Z";
      case 2: // The High Priestess
        return "M0,-40 A40,40 0 0 1 0,40 A40,40 0 0 1 0,-40 Z M0,-20 A20,20 0 0 0 0,20 A20,20 0 0 0 0,-20 Z";
      // Thêm các biểu tượng cho các lá Major Arcana còn lại
      default:
        return "M0,-30 L30,30 L-30,30 Z";
    }
  };

  // Biểu tượng cho 4 bộ (Cups, Wands, Swords, Pentacles)
  const getSuitSymbols = (id: number, color: string) => {
    // 22-35: Cups, 36-49: Swords, 50-63: Wands, 64-77: Pentacles
    const suit = id >= 22 && id <= 35 ? "cups" :
                id >= 36 && id <= 49 ? "swords" :
                id >= 50 && id <= 63 ? "wands" : "pentacles";
                
    const rank = ((id - 22) % 14) + 1; // 1 = Ace, 2-10, 11 = Page, 12 = Knight, 13 = Queen, 14 = King
    
    // Vị trí của các biểu tượng
    const positions = getPositions(rank);
    
    return (
      <>
        {positions.map((pos, i) => (
          <g key={i} transform={`translate(${pos.x}, ${pos.y}) scale(0.7)`}>
            {suit === "cups" && (
              <path d="M0,-10 C-20,-10 -20,10 0,15 C20,10 20,-10 0,-10 Z" fill={color} />
            )}
            {suit === "swords" && (
              <path d="M0,-15 L2,-5 L15,-10 L2,0 L15,10 L2,5 L0,15 L-2,5 L-15,10 L-2,0 L-15,-10 L-2,-5 Z" fill={color} />
            )}
            {suit === "wands" && (
              <rect x="-5" y="-15" width="10" height="30" rx="5" fill={color} />
            )}
            {suit === "pentacles" && (
              <g>
                <circle r="10" fill={color} />
                <circle r="5" fill="none" stroke={colors.secondary} strokeWidth="2" />
              </g>
            )}
          </g>
        ))}
        
        {/* Thêm biểu tượng cho Court Cards */}
        {rank > 10 && (
          <g transform="translate(0, 0)">
            {rank === 11 && ( // Page
              <circle r="20" fill="none" stroke={color} strokeWidth="2" />
            )}
            {rank === 12 && ( // Knight
              <path d="M-20,-20 L20,-20 L20,20 L-20,20 Z" fill="none" stroke={color} strokeWidth="2" />
            )}
            {rank === 13 && ( // Queen
              <path d="M0,-30 L20,-10 L20,20 L-20,20 L-20,-10 Z" fill="none" stroke={color} strokeWidth="2" />
            )}
            {rank === 14 && ( // King
              <path d="M-20,-30 L20,-30 L20,30 L-20,30 Z" fill="none" stroke={color} strokeWidth="2" />
              // Thêm "vương miện"
            )}
          </g>
        )}
      </>
    );
  };

  // Tính toán vị trí của các biểu tượng dựa vào rank
  const getPositions = (rank: number) => {
    const positions: Array<{x: number, y: number}> = [];
    
    if (rank === 1) { // Ace
      positions.push({x: 0, y: 0});
    } else if (rank >= 2 && rank <= 10) { // Number cards
      // Sắp xếp các biểu tượng theo số lượng
      if (rank === 2) {
        positions.push({x: 0, y: -30}, {x: 0, y: 30});
      } else if (rank === 3) {
        positions.push({x: 0, y: -30}, {x: 0, y: 0}, {x: 0, y: 30});
      } else if (rank === 4) {
        positions.push({x: -25, y: -25}, {x: 25, y: -25}, {x: -25, y: 25}, {x: 25, y: 25});
      } else if (rank === 5) {
        positions.push({x: -25, y: -25}, {x: 25, y: -25}, {x: 0, y: 0}, {x: -25, y: 25}, {x: 25, y: 25});
      } else if (rank === 6) {
        positions.push({x: -25, y: -25}, {x: 25, y: -25}, 
                      {x: -25, y: 0}, {x: 25, y: 0},
                      {x: -25, y: 25}, {x: 25, y: 25});
      } else if (rank === 7) {
        positions.push({x: -25, y: -30}, {x: 25, y: -30}, 
                      {x: -25, y: -10}, {x: 25, y: -10},
                      {x: -25, y: 10}, {x: 25, y: 10},
                      {x: 0, y: 30});
      } else if (rank === 8) {
        positions.push({x: -25, y: -30}, {x: 25, y: -30}, 
                      {x: -25, y: -10}, {x: 25, y: -10},
                      {x: -25, y: 10}, {x: 25, y: 10},
                      {x: -25, y: 30}, {x: 25, y: 30});
      } else if (rank === 9) {
        positions.push({x: -25, y: -30}, {x: 0, y: -30}, {x: 25, y: -30},
                      {x: -25, y: -10}, {x: 0, y: -10}, {x: 25, y: -10},
                      {x: -25, y: 10}, {x: 0, y: 10}, {x: 25, y: 10});
      } else if (rank === 10) {
        positions.push({x: -25, y: -30}, {x: 0, y: -30}, {x: 25, y: -30},
                      {x: -25, y: -10}, {x: 0, y: -10}, {x: 25, y: -10},
                      {x: -25, y: 10}, {x: 0, y: 10}, {x: 25, y: 10},
                      {x: 0, y: 30});
      }
    } else {
      // Court cards sẽ hiển thị một biểu tượng lớn ở giữa
      positions.push({x: -25, y: -25}, {x: 25, y: -25}, {x: -25, y: 25}, {x: 25, y: 25});
    }
    
    return positions;
  };

  return isCardBack ? renderCardBack() : renderCardFront();
};

export default TarotCardSVG; 