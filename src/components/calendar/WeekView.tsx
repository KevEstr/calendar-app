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
      <div className="flex justify-center gap-2 pt-6 mb-4">
        {weeks.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedWeek(index)}
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
      
      <div className="grid grid-cols-7 gap-1 md:gap-2 lg:gap-4">
        {weeks[selectedWeek].map((day, dayIndex) => {
          if (!day) return <div key={`empty-${dayIndex}`} className="bg-gray-50" />;
          
          const currentDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), day);
          const dayEvents = events.filter(event => 
            new Date(event.date).toDateString() === currentDay.toDateString()
          );

          return (
            <div key={dayIndex} className="bg-white rounded-lg shadow-sm">
              <div className="text-xs md:text-sm lg:text-base font-medium sticky top-0 bg-white p-4 border-b text-center">
                {currentDay.toLocaleDateString('es-ES', { weekday: 'long' }).replace(/^\w/, c => c.toUpperCase())}
                <div className="text-gray-500 text-center">{day}</div>
              </div>
              
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
                      <div className="text-xs text-gray-500 font-medium">
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
                          <div className="font-medium">{event.title}</div>
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
};
