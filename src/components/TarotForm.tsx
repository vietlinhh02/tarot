"use client";

import { useState } from 'react';
import { spreadTypes } from '../data/tarotCards';
import TarotSelector from './TarotSelector';

// Định nghĩa interface props cho TarotForm
interface TarotFormProps {
  selectedSpread: string;
  onSelectSpread: (spreadId: string) => void;
  question: string;
  onQuestionChange: (newQuestion: string) => void;
  onSubmit: (manualCardIds?: number[]) => Promise<void>;
  isLoading: boolean;
}

const TarotForm = ({
  selectedSpread,
  onSelectSpread,
  question,
  onQuestionChange,
  onSubmit,
  isLoading
}: TarotFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState<'random' | 'manual'>('random');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  
  // Xác định số lượng lá bài cần thiết cho kiểu trải bài đã chọn
  const spreadType = spreadTypes.find(s => s.id === selectedSpread);
  const requiredCards = spreadType ? spreadType.positions.length : 1;

  // Xử lý khi chọn/bỏ chọn một lá bài
  const handleCardSelection = (cardId: number) => {
    setSelectedCards(prev => {
      if (prev.includes(cardId)) {
        // Bỏ chọn lá bài
        return prev.filter(id => id !== cardId);
      } else if (prev.length < requiredCards) {
        // Thêm lá bài
        return [...prev, cardId];
      }
      return prev;
    });
  };

  // Validate khi submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra nếu câu hỏi quá ngắn
    if (question.trim().length < 3) {
      setError('Vui lòng nhập câu hỏi của bạn');
      return;
    }

    // Kiểm tra nếu đang ở chế độ chọn thủ công nhưng chưa chọn đủ số lá bài
    if (selectionMode === 'manual' && selectedCards.length < requiredCards) {
      setError(`Vui lòng chọn đủ ${requiredCards} lá bài`);
      return;
    }
    
    setError(null);
    
    // Gọi hàm submit với các lá bài đã chọn (nếu ở chế độ manual)
    if (selectionMode === 'manual') {
      await onSubmit(selectedCards);
    } else {
      await onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl mx-auto">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-white uppercase tracking-wide">
          CHỌN KIỂU TRẢI BÀI
          <div className="divider w-40 mx-auto mt-4"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spreadTypes.map(spread => (
            <div 
              key={spread.id} 
              className={`mystic-box rounded-xl p-5 cursor-pointer transition-all duration-300 
                ${selectedSpread === spread.id 
                  ? 'border-2 border-accent shadow-accent scale-105' 
                  : 'hover:scale-102'}`}
              onClick={() => onSelectSpread(spread.id)}
            >
              <h3 className="text-xl font-bold mb-3 text-center text-white">{spread.name}</h3>
              <p className="text-sm text-mystic mb-3">{spread.description}</p>
              <div className="text-center text-xs text-mystic opacity-80">
                {spread.positions.length} lá bài
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-white uppercase tracking-wide">
          CHỌN PHƯƠNG THỨC RÚT BÀI
          <div className="divider w-40 mx-auto mt-4"></div>
        </h2>
        
        <div className="flex justify-center gap-6">
          <button 
            type="button"
            className={`px-6 py-4 rounded-xl transition-all ${selectionMode === 'random' ? 'bg-accent text-white' : 'bg-black bg-opacity-40 text-mystic'}`}
            onClick={() => setSelectionMode('random')}
          >
            Rút ngẫu nhiên
          </button>
          <button 
            type="button"
            className={`px-6 py-4 rounded-xl transition-all ${selectionMode === 'manual' ? 'bg-accent text-white' : 'bg-black bg-opacity-40 text-mystic'}`}
            onClick={() => setSelectionMode('manual')}
          >
            Tự chọn bài
          </button>
        </div>
        
        {selectionMode === 'manual' && (
          <TarotSelector
            selectedCards={selectedCards}
            onSelectCard={handleCardSelection}
            maxSelections={requiredCards}
          />
        )}
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-white uppercase tracking-wide">
          NHẬP CÂU HỎI CỦA BẠN
          <div className="divider w-40 mx-auto mt-4"></div>
        </h2>
        
        <div className="glass-input-container w-full">
          <textarea 
            className="w-full p-6 rounded-xl bg-black bg-opacity-40 border border-white border-opacity-30 text-white shadow-inner text-lg min-h-[150px]"
            placeholder="Nhập câu hỏi bạn muốn Tarot giải đáp..."
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            disabled={isLoading}
          />
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button 
          type="submit" 
          className="btn-primary button-glow py-4 px-10 text-xl uppercase tracking-wider font-bold"
          disabled={isLoading}
        >
          {isLoading ? 'ĐANG XỬ LÝ...' : selectionMode === 'random' ? 'RÚT BÀI TAROT' : 'XEM DIỄN GIẢI'}
        </button>
      </div>
    </form>
  );
};

export default TarotForm;