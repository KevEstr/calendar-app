import { Event } from '../../types/Event';
import { getDaysWithEvents, getDayEvents } from '../../utils/eventHelpers';

interface AgendaViewProps {
  currentStoreDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const AgendaView = ({ currentStoreDate, events, onEventClick }: AgendaViewProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-2 md:space-y-4 lg:space-y-6">
      {getDaysWithEvents(events).map((day) => {
        const dayEvents = getDayEvents(day, currentStoreDate, events);
        return (
          <div key={day} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg font-medium">
              {`${day} de ${currentStoreDate.toLocaleString('default', { month: 'long' })}, ${currentStoreDate.getFullYear()}`}
            </div>
            <div className="divide-y divide-gray-100">
              {dayEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="p-2 md:p-4 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onEventClick(event)}
                >
                  <div className="text-xs md:text-sm lg:text-base font-medium">{event.title}</div>
                  <div className="text-[10px] md:text-xs lg:text-sm text-gray-500">
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
