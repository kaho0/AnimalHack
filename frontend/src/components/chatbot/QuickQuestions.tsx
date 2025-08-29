interface QuickQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export default function QuickQuestions({
  questions,
  onQuestionClick,
}: QuickQuestionsProps) {
  return (
    <div className="px-3 py-2 lg:px-4 lg:py-3 xl:px-6 xl:py-4 border-t border-gray-100 bg-white font-lato">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {questions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionClick(question)}
            className="
              flex-shrink-0 px-2 py-1.5 lg:px-3 lg:py-2 xl:px-4 xl:py-2.5
              bg-gray-100 hover:bg-emerald-50 
              text-gray-700 hover:text-emerald-700
              rounded-lg text-xs lg:text-sm xl:text-base font-medium
              transition-all duration-200
              transform hover:scale-105
              border border-transparent hover:border-emerald-200
            "
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
