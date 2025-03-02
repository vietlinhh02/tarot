import { spreadTypes } from '../data/tarotCards';

interface SpreadSelectorProps {
  selectedSpread: string;
  onSelectSpread: (spreadId: string) => void;
}

const SpreadSelector = ({ selectedSpread, onSelectSpread }: SpreadSelectorProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-purple-800">
        Chọn kiểu trải bài
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {spreadTypes.map((spread) => (
          <div
            key={spread.id}
            className={`
              p-4 rounded-lg cursor-pointer transition-all
              ${
                selectedSpread === spread.id
                  ? 'bg-purple-700 text-white shadow-lg'
                  : 'bg-white hover:bg-purple-100 border border-purple-200'
              }
            `}
            onClick={() => onSelectSpread(spread.id)}
          >
            <h3 className="font-bold text-lg">{spread.name}</h3>
            <p className="text-sm mt-1">
              {spread.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpreadSelector; 