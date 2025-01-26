import { Event } from '../../types/Event';
import { getWeeksInMonth } from '../../utils/dateHelpers';

interface WeekViewProps {
  currentStoreDate: Date;
  events: Event[];
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  onEventClick: (event: Event) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

export const WeekView = ({ 
  currentStoreDate, 
  events, 
  selectedWeek, 
  setSelectedWeek,
  onEventClick,
  onTimeSlotClick 
}: WeekViewProps) => {
  const weeks = getWeeksInMonth(currentStoreDate);

  return (
    <div className="flex flex-col gap-4">
      {/* Week selector - make it scrollable on mobile */}
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex justify-start md:justify-center gap-2 pt-6 mb-4 min-w-max">
          {weeks.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedWeek(index)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg whitespace-nowrap ${
                selectedWeek === index 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Semana {index + 1}
            </button>
          ))}
        </div>
      </div>
  
      {/* Week grid - optimize for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2">
        {weeks[selectedWeek].map((day, dayIndex) => {
          if (!day) return null;
          
          const currentDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), day);
          const dayEvents = events.filter(event => 
            new Date(event.date).toDateString() === currentDay.toDateString()
          );
  
          return (
            <div key={dayIndex} className="bg-white rounded-lg shadow-sm">
              {/* Day header */}
              <div className="sticky top-0 bg-white p-3 border-b text-center">
                <div className="font-medium text-gray-900">
                  {currentDay.toLocaleDateString('es-ES', { weekday: 'short' })}
                </div>
                <div className="text-sm text-gray-500">{day}</div>
              </div>
              
              {/* Time slots */}
              <div className="divide-y divide-gray-100">
                {Array.from({ length: 24 }).map((_, hour) => {
                  const hourEvents = dayEvents.filter(event => {
                    const eventStartHour = parseInt(event.startTime.split(':')[0]);
                    const eventEndHour = parseInt(event.endTime.split(':')[0]);
                    return hour >= eventStartHour && hour < eventEndHour;
                  });
  
                  return (
                    <div 
                      key={hour} 
                      className={`p-2 transition-colors ${
                        hourEvents.length > 0 
                          ? 'bg-blue-50 hover:bg-blue-100' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => onTimeSlotClick(currentDay, hour)}
                    >
                      <div className="text-xs font-medium text-gray-500">
                        {`${hour.toString().padStart(2, '0')}:00`}
                      </div>
                      {hourEvents.map(event => (
                        <div
                          key={event.id}
                          className={`${event.color} mt-1 p-2 rounded-lg text-white cursor-pointer`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                          }}
                        >
                          <div className="font-medium text-sm">{event.title}</div>
                          <div className="text-xs opacity-90">{`${event.startTime} - ${event.endTime}`}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}  