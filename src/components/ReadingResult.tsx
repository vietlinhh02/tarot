import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '../data/tarotCards';

interface ReadingResultProps {
  reading: Array<{
    position: { id: string; name: string };
    card: TarotCardType;
    isReversed: boolean;
  }> | null;
  interpretation: string | null;
  isRevealed: boolean;
  onReveal: () => void;
}

const ReadingResult = ({ 
  reading, 
  interpretation, 
  isRevealed, 
  onReveal 
}: ReadingResultProps) => {
  if (!reading) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">
        Trải bài của bạn
      </h2>
      
      {!isRevealed && (
        <div className="text-center mb-8">
          <button
            onClick={onReveal}
            className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-purple-800 transition-colors"
          >
            Lật bài
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {reading.map((item, index) => (
          <TarotCard
            key={index}
            card={item.card}
            position={item.position}
            isReversed={item.isReversed}
            isRevealed={isRevealed}
          />
        ))}
      </div>

      {isRevealed && interpretation && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-purple-800">Diễn giải</h1>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ 
            __html: interpretation.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }} />
          <p className="mt-6 text-sm text-gray-500 text-center">
            Kết quả chỉ mang tính giải trí
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadingResult; 