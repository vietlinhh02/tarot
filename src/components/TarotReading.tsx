import { TarotCard as TarotCardType } from '../data/tarotCards';
import TarotCard from './TarotCard';
import { useState, useEffect, useMemo } from 'react';

interface TarotReadingProps {
  reading: Array<{
    position: { id: string; name: string };
    card: TarotCardType;
    isReversed: boolean;
  }>;
  interpretation: string | null;
  isRevealed: boolean;
  onReveal: () => void;
  onNewReading: () => void;
}

const TarotReading = ({
  reading,
  interpretation,
  isRevealed,
  onReveal,
  onNewReading
}: TarotReadingProps) => {
  const [animationIndex, setAnimationIndex] = useState(-1);
  const [allCardsRevealed, setAllCardsRevealed] = useState(false);

  // Tạo các style cho ngôi sao một lần duy nhất khi component mount
  const starStyles = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 4 + 3}s`
    }));
  }, []);

  useEffect(() => {
    if (isRevealed) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < reading.length) {
          setAnimationIndex(index);
          index++;
        } else {
          clearInterval(interval);
          setAllCardsRevealed(true);
        }
      }, 300); // Giảm thời gian hiển thị giữa các lá bài
      return () => clearInterval(interval);
    } else {
      setAllCardsRevealed(false);
    }
  }, [isRevealed, reading.length]);

  // Xử lý markdown và tách các đề mục trong phần diễn giải
  const formatInterpretation = (text: string) => {
    if (!text) return '';
    
    // Thay thế xuống dòng
    let formattedText = text.replace(/\n/g, '<br />');
    
    // Xử lý các heading
    formattedText = formattedText.replace(/##\s+(.*?)(?:\n|<br \/>|$)/g, '<h2 class="text-2xl font-bold text-accent mt-6 mb-4">$1</h2>');
    formattedText = formattedText.replace(/###\s+(.*?)(?:\n|<br \/>|$)/g, '<h3 class="text-xl font-bold text-accent mt-5 mb-3">$1</h3>');
    
    // Xử lý các danh sách
    formattedText = formattedText.replace(/^\*\s+(.*?)(?:\n|<br \/>|$)/gm, '<li class="ml-4 mb-2">$1</li>');
    formattedText = formattedText.replace(/^-\s+(.*?)(?:\n|<br \/>|$)/gm, '<li class="ml-4 mb-2">$1</li>');
    formattedText = formattedText.replace(/<li/g, '<ul class="my-3"><li');
    formattedText = formattedText.replace(/<\/li>/g, '</li></ul>');
    formattedText = formattedText.replace(/<\/ul><ul[^>]*>/g, '');
    
    // Xử lý đoạn văn
    formattedText = formattedText.replace(/((?:<br \/>){2,})/g, '</p><p class="mb-4">');
    
    // Xử lý đậm và nghiêng
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-accent text-xl">$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em class="text-base">$1</em>');
    
    // Tạo dấu gạch ngang (divider) cho các đề mục lớn
    formattedText = formattedText.replace(/<h2/g, '<div class="w-32 h-0.5 bg-white bg-opacity-30 my-6 mx-auto"></div><h2');
    
    // Thêm phần wrap đầu tiên nếu không có heading nào ở đầu
    if (!formattedText.startsWith('<h2') && !formattedText.startsWith('<h3')) {
      formattedText = '<p class="mb-4">' + formattedText;
    }
    
    // Đảm bảo kết thúc bằng thẻ đóng
    if (!formattedText.endsWith('</p>')) {
      formattedText = formattedText + '</p>';
    }
    
    return formattedText;
  };

  // Kiểm tra nếu đây là trải bài 10 lá (Celtic Cross)
  const isCelticCross = reading.length === 10;

  // Chia lá bài thành hai hàng nếu là Celtic Cross
  const renderCards = () => {
    if (isCelticCross) {
      return (
        <div className="flex flex-col gap-12">
          {/* Tăng khoảng cách giữa hàng từ gap-8 lên gap-12 */}
          {/* Hàng đầu tiên: 5 lá đầu tiên */}
          <div className="flex flex-nowrap justify-center gap-8">
            {/* Tăng khoảng cách giữa các lá từ gap-4 lên gap-8 */}
            {reading.slice(0, 5).map((item, index) => (
              <div 
                key={index} 
                className={`${isRevealed && animationIndex >= index ? 'fade-in' : 'opacity-0'} w-40`}
                style={{ 
                  transitionDelay: `${index * 0.15}s`,
                }}
              >
                <TarotCard
                  card={item.card}
                  position={item.position}
                  isReversed={item.isReversed}
                  isRevealed={isRevealed && animationIndex >= index}
                />
              </div>
            ))}
          </div>
          
          {/* Hàng thứ hai: 5 lá tiếp theo */}
          <div className="flex flex-nowrap justify-center gap-8">
            {/* Tăng khoảng cách giữa các lá từ gap-4 lên gap-8 */}
            {reading.slice(5, 10).map((item, index) => (
              <div 
                key={index + 5} 
                className={`${isRevealed && animationIndex >= index + 5 ? 'fade-in' : 'opacity-0'} w-40`}
                style={{ 
                  transitionDelay: `${(index + 5) * 0.15}s`,
                }}
              >
                <TarotCard
                  card={item.card}
                  position={item.position}
                  isReversed={item.isReversed}
                  isRevealed={isRevealed && animationIndex >= index + 5}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Các kiểu trải bài khác (1 lá, 3 lá) - hiển thị trong một hàng như trước
      return (
        <div className="flex flex-nowrap justify-center gap-8">
          {/* Tăng khoảng cách giữa các lá từ gap-4 lên gap-8 */}
          {reading.map((item, index) => (
            <div 
              key={index} 
              className={`${isRevealed && animationIndex >= index ? 'fade-in' : 'opacity-0'} w-40`}
              style={{ 
                transitionDelay: `${index * 0.15}s`,
              }}
            >
              <TarotCard
                card={item.card}
                position={item.position}
                isReversed={item.isReversed}
                isRevealed={isRevealed && animationIndex >= index}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="space-y-16 slide-up">
      {/* PHẦN HIỂN THỊ LÁ BÀI */}
      <div className="card-section glass-effect p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-white uppercase tracking-wide">
          TRẢI BÀI CỦA BẠN
          <div className="divider w-40 mx-auto mt-4"></div>
        </h2>
        
        {!isRevealed && (
          <div className="text-center mb-10">
            <div className="mystic-box p-8 max-w-xl mx-auto mb-8 rounded-xl shadow-mystic">
              <p className="text-mystic mb-6 text-lg">
                Các lá bài đã được rút. Hãy tập trung vào câu hỏi của bạn và nhấn nút bên dưới để lật bài.
              </p>
              <button
                onClick={onReveal}
                className="btn-primary button-glow text-lg py-3 px-8 uppercase tracking-wider font-bold"
              >
                LẬT BÀI
              </button>
            </div>
          </div>
        )}

        <div className="w-full mb-6 overflow-x-auto pb-6">
          {renderCards()}
        </div>
      </div>

      {/* PHẦN THÔNG BÁO ĐANG DIỄN GIẢI */}
      {isRevealed && allCardsRevealed && !interpretation && (
        <div className="max-w-2xl mx-auto text-center slide-up">
          <div className="mystic-box p-6 rounded-xl mb-8 fade-in">
            <h3 className="text-xl font-bold mb-4 text-white uppercase">ĐANG DIỄN GIẢI...</h3>
            <div className="flex justify-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <p className="text-mystic text-lg">
              Vui lòng đợi một chút để hệ thống phân tích và diễn giải các lá bài của bạn.
              <br />
              <span className="text-sm mt-2 inline-block opacity-80">
                Quá trình này có thể mất từ 15-30 giây tùy thuộc vào độ phức tạp của trải bài
              </span>
            </p>
          </div>
        </div>
      )}

      {/* PHẦN DIỄN GIẢI */}
      {isRevealed && interpretation && (
        <div className="interpretation-section max-w-3xl mx-auto card-container shadow-2xl scale-in rounded-xl overflow-hidden bg-gray-900 border border-purple-500 border-opacity-30">
          <div className="bg-purple-900 bg-opacity-30 py-6">
            <h3 className="text-4xl font-bold text-center uppercase tracking-wide text-accent">
              DIỄN GIẢI
            </h3>
          </div>
          <div className="corner-decoration top-left"></div>
          <div className="corner-decoration top-right"></div>
          <div className="corner-decoration bottom-left"></div>
          <div className="corner-decoration bottom-right"></div>
          
          <div className="p-8 md:p-10 interpretation-text">
            <div 
              className="text-white text-lg leading-relaxed font-light space-y-4 interpretation-content"
              style={{ 
                fontSize: '1.05rem',
                lineHeight: '1.6'
              }}
              dangerouslySetInnerHTML={{ __html: formatInterpretation(interpretation) }}
            />
            
            <div className="mt-12 text-center">
              <button
                onClick={onNewReading}
                className="btn-secondary button-glow py-3 px-6 uppercase tracking-wider font-bold text-lg"
              >
                TRẢI BÀI MỚI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stars effect in background */}
      <div className="stars-container">
        {starStyles.map((style, i) => (
          <div
            key={i}
            className="star"
            style={style}
          />
        ))}
      </div>
    </div>
  );
};

export default TarotReading; 