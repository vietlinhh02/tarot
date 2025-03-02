'use client';

import { useState, useCallback } from 'react';
import Stars from '../components/Stars';
import MysticElements from '../components/MysticElements';
import TarotForm from '../components/TarotForm';
import TarotReading from '../components/TarotReading';
import { drawCards, createReading, createManualReading } from '../utils/tarotUtils';
import { generateTarotReading } from '../utils/apiService';
import { spreadTypes, TarotCard, tarotCards } from '../data/tarotCards';

// Định nghĩa type cho Reading
interface TarotReading {
  position: { id: string; name: string };
  card: TarotCard;
  isReversed: boolean;
}

export default function Home() {
  const [selectedSpread, setSelectedSpread] = useState('three_card');
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState<TarotReading[] | null>(null);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Sử dụng useCallback để tránh tạo hàm mới mỗi lần render
  const handleSelectSpread = useCallback((spreadId: string) => {
    setSelectedSpread(spreadId);
  }, []);

  const handleQuestionChange = useCallback((newQuestion: string) => {
    setQuestion(newQuestion);
  }, []);

  const handleDrawCards = async (manualCardIds?: number[]) => {
    setIsLoading(true);
    setReading(null);
    setInterpretation(null);
    setIsRevealed(false);

    try {
      // Xác định số lượng lá bài cần rút dựa trên kiểu trải bài
      const spreadType = spreadTypes.find(s => s.id === selectedSpread);
      if (!spreadType) throw new Error('Kiểu trải bài không hợp lệ');
      
      let newReading;
      
      if (manualCardIds && manualCardIds.length > 0) {
        // Nếu có ID lá bài được chỉ định, sử dụng chúng thay vì rút ngẫu nhiên
        const selectedCards = manualCardIds.map(id => {
          const card = tarotCards.find(c => c.id === id);
          if (!card) throw new Error(`Không tìm thấy lá bài với ID ${id}`);
          return card;
        });
        
        // Tạo trải bài từ các lá bài đã chọn
        newReading = createManualReading(selectedSpread, selectedCards);
      } else {
        // Rút bài ngẫu nhiên như bình thường
        const cardCount = spreadType.positions.length;
        const cards = drawCards(cardCount);
        newReading = createReading(selectedSpread, cards);
      }
      
      setReading(newReading);
      
      // Tạo diễn giải (sẽ được hiển thị sau khi lật bài)
      const newInterpretation = await generateTarotReading(
        spreadType.name,
        newReading,
        question
      );
      
      setInterpretation(newInterpretation);
    } catch (error) {
      console.error('Lỗi khi rút bài:', error);
      alert('Đã xảy ra lỗi khi rút bài. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNewReading = () => {
    setReading(null);
    setInterpretation(null);
    setIsRevealed(false);
  };

  return (
    <main className="min-h-screen py-16 px-6 relative overflow-hidden">
      {/* Hiệu ứng nền */}
      <Stars count={40} />
      <MysticElements density={2} />
      
      <div className="max-w-6xl mx-auto relative">
        <header className="text-center mb-16 slide-up">
          <h1 className="text-6xl font-bold mb-8 title-gradient uppercase tracking-wider">TAROT ONLINE</h1>
          <div className="divider w-40 mx-auto my-6"></div>
          <p className="text-xl max-w-3xl mx-auto text-mystic shadow-text leading-relaxed">
            Chào mừng bạn đến với thế giới huyền bí của Tarot. Hãy tập trung vào câu hỏi của bạn và để các lá bài tiết lộ những điều ẩn giấu.
          </p>
        </header>

        {/* Trang trí góc */}
        <div className="corner-decoration top-left"></div>
        <div className="corner-decoration top-right"></div>
        <div className="corner-decoration bottom-left"></div>
        <div className="corner-decoration bottom-right"></div>

        <div className="glass-effect p-8 mb-16 rounded-2xl shadow-2xl backdrop-blur-sm">
          {!reading ? (
            <TarotForm
              selectedSpread={selectedSpread}
              onSelectSpread={handleSelectSpread}
              question={question}
              onQuestionChange={handleQuestionChange}
              onSubmit={handleDrawCards}
              isLoading={isLoading}
            />
          ) : (
            <TarotReading
              reading={reading}
              interpretation={interpretation}
              isRevealed={isRevealed}
              onReveal={handleReveal}
              onNewReading={handleNewReading}
            />
          )}
        </div>

        <footer className="text-center text-sm opacity-70 mt-20 fade-in">
          <p>TAROT ONLINE © {new Date().getFullYear()} - eddiesngu</p>
        </footer>
      </div>
    </main>
  );
}