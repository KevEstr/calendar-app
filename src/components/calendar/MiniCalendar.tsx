import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysWithEvents } from '../../utils/eventHelpers';
import { isToday } from '../../utils/dateHelpers';
import { Event } from '../../types/Event';

interface MiniCalendarProps {
  currentStoreDate: Date;
  events: Event[];
  onDayClick: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const MiniCalendar = ({ 
  currentStoreDate, 
  events, 
  onDayClick, 
  onPrevMonth, 
  onNextMonth 
}: MiniCalendarProps) => {
  const firstDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth() + 1, 0).getDate();

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold text-gray-900">
          {currentStoreDate.toLocaleString('default', { month: 'long', year: 'numeric' }).replace(/^\w/, (c) => c.toUpperCase())}
        </div>
        <div className="flex gap-1">
          <button 
            onClick={onPrevMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={onNextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
        {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
          <div key={day} className="text-gray-500 font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <div
              key={day}
              onClick={() => onDayClick(day)}
              className={`
                aspect-square flex items-center justify-center rounded-full
                ${getDaysWithEvents(events).includes(day) ? "bg-blue-100 text-blue-700 font-medium" : ""}
                ${isToday(day, currentStoreDate) ? "bg-blue-600 text-white font-medium" : ""}
                hover:bg-gray-100 cursor-pointer transition-all
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};
