import { Event } from '../../types/Event';
import { isToday } from '../../utils/dateHelpers';
import { getDayEvents } from '../../utils/eventHelpers';

interface MonthViewProps {
  currentStoreDate: Date;
  events: Event[];
  onDayClick: (day: number) => void;
  onEventClick: (event: Event) => void;
}

export const MonthView = ({ currentStoreDate, events, onDayClick, onEventClick }: MonthViewProps) => {
  const firstDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth() + 1, 0).getDate();

  return (
    <>
      <div className="grid grid-cols-7 mb-2 md:mb-4">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="text-[10px] md:text-sm lg:text-base font-semibold text-gray-600 text-center py-1 md:py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 md:gap-2 lg:gap-4">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = getDayEvents(day, currentStoreDate, events);
          return (
            <div key={day} onClick={() => onDayClick(day)} className="relative group cursor-pointer">
              <div className={`
                aspect-square p-1 md:p-2 lg:p-4 rounded-lg transition-all border border-gray-100
                ${isToday(day, currentStoreDate) ? "bg-gradient-to-br from-blue-50 to-blue-100 ring-2 ring-blue-500" : "hover:bg-gray-50 hover:shadow-md"}
                ${dayEvents.length > 0 ? "ring-1 ring-blue-200" : ""}
              `}>
                <div className={`
                  text-xs md:text-sm lg:text-base w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center mb-1 md:mb-2
                  ${isToday(day, currentStoreDate) ? "bg-blue-600 text-white" : "text-gray-700"}
                `}>
                  {day}
                </div>
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`text-[8px] md:text-xs lg:text-sm px-1 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg ${event.color} text-white shadow-sm flex flex-col`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    <span className="text-[6px] md:text-[8px] lg:text-xs">{event.startTime}</span>
                    <span className="text-[8px] md:text-xs lg:text-sm font-medium truncate max-w-[120px]">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
