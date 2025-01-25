interface WeekSelectorProps {
    weeks: (number | null)[][];
    selectedWeek: number;
    onWeekSelect: (weekIndex: number) => void;
  }
  
  export const WeekSelector = ({ weeks, selectedWeek, onWeekSelect }: WeekSelectorProps) => {
    return (
      <div className="flex justify-center gap-2 pt-6 mb-4">
        {weeks.map((_, index) => (
          <button
            key={index}
            onClick={() => onWeekSelect(index)}
            className={`px-4 py-2 rounded-lg ${
              selectedWeek === index 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Semana {index + 1}
          </button>
        ))}
      </div>
    );
  };
  