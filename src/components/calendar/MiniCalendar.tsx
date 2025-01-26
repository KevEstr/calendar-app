import { ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { getDaysWithEvents } from '../../utils/eventHelpers';
import { isToday } from '../../utils/dateHelpers';
import { Event } from '../../types/Event';

interface MiniCalendarProps {
  currentStoreDate: Date;
  events: Event[];
  onDayClick: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
  setShowDatePicker: (show: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
  resetForm: () => void;
}


export const MiniCalendar = ({ 
  currentStoreDate, 
  events, 
  onDayClick, 
  onPrevMonth, 
  onNextMonth,
  isCollapsed = false,
  onToggle,
  setShowDatePicker,
  setIsModalOpen,
  resetForm
}: MiniCalendarProps) => {
  const firstDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth() + 1, 0).getDate();

  return (

    <div className="border-b border-gray-200">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:hidden"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Vista rápida del calendario</span>
        </div>

        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        )}
      </button>

    <div className={`${isCollapsed ? 'hidden' : 'block'} md:block`}>

    <div className="p-2 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm md:text-lg font-semibold text-gray-900">
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

      <button
        onClick={() => {
          setShowDatePicker(true); // Necesitarás pasar esta función como prop
          setIsModalOpen(true); // Necesitarás pasar esta función como prop
          resetForm(); // Necesitarás pasar esta función como prop
          
        }}
        className="w-full mb-4 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Crear evento rápido
      </button>

      <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-sm mb-1 md:mb-2">
        {["D", "L", "M", "W", "J", "V", "S"].map((day) => (
          <div key={day} className="text-gray-500 font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-xs md:text-sm">
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
  </div>
  </div>
  );
};
