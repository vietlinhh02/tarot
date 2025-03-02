interface QuestionInputProps {
  question: string;
  onQuestionChange: (question: string) => void;
}

const QuestionInput = ({ question, onQuestionChange }: QuestionInputProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-purple-800">
        Nhập câu hỏi của bạn (không bắt buộc)
      </h2>
      <div className="max-w-2xl mx-auto">
        <textarea
          className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
          placeholder="Nhập câu hỏi hoặc chủ đề bạn muốn khám phá..."
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-2">
          Tập trung vào câu hỏi của bạn và để các lá bài tiết lộ câu trả lời.
        </p>
      </div>
    </div>
  );
};

export default QuestionInput; 