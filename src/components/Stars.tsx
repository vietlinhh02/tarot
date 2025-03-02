"use client";

import { useEffect, useState, useCallback } from 'react';

interface Star {
  id: number;
  size: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface StarsProps {
  count?: number;
}

const Stars = ({ count = 20 }: StarsProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Sử dụng useCallback để tránh tạo lại hàm mỗi khi render
  const generateStars = useCallback(() => {
    if (!isClient) return [];
    
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1, // 1-4px
      top: Math.random() * 100, // 0-100%
      left: Math.random() * 100, // 0-100%
      delay: Math.random() * 8, // 0-8s
      duration: Math.random() * 3 + 3, // 3-6s
      opacity: Math.random() * 0.5 + 0.3 // 0.3-0.8
    }));
  }, [count, isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setStars(generateStars());
    }
    // Chỉ chạy khi count thay đổi hoặc component mount hoặc client state thay đổi
  }, [count, generateStars, isClient]);

  // Không render nội dung ngẫu nhiên trên server
  if (!isClient) {
    return <div className="stars fixed inset-0 w-full h-full -z-10"></div>;
  }

  return (
    <div className="stars fixed inset-0 w-full h-full -z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
};

export default Stars; 