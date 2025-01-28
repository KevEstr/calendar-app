import { getWeeksInMonth } from '../../utils/dateHelpers';
import { WeekViewProps } from '../../types/Calendar';

/**
 * Componente WeekView
 * 
 * Muestra una vista semanal de los eventos de un mes, permitiendo la selección de semanas
 * y la interacción con eventos y franjas horarias.
 * 
 * @param {WeekViewProps} props - Propiedades del componente:
 *   - currentStoreDate: Fecha actual seleccionada en el calendario.
 *   - events: Lista de eventos del mes.
 *   - selectedWeek: Índice de la semana actualmente seleccionada.
 *   - setSelectedWeek: Función para cambiar la semana seleccionada.
 *   - onEventClick: Función para manejar clics en eventos.
 *   - onTimeSlotClick: Función para manejar clics en franjas horarias.
 */
export const WeekView = ({ 
  currentStoreDate, 
  events, 
  selectedWeek, 
  setSelectedWeek,
  onEventClick,
  onTimeSlotClick 
}: WeekViewProps) => {
  // Obtiene las semanas del mes como un array de arrays de días
  const weeks = getWeeksInMonth(currentStoreDate);

  return (
    <div className="flex flex-col gap-4">
      
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex justify-start md:justify-center gap-2 pt-6 mb-4 min-w-max">
          {weeks.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedWeek(index)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-sm rounded-lg whitespace-nowrap ${
                selectedWeek === index 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
              }`}
            >
              Semana {index + 1}
            </button>
          ))}
        </div>
      </div>
  
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 md:gap-2">
        {weeks[selectedWeek].map((day, dayIndex) => {
          if (!day) return null;
          
          const currentDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), day);
          const dayEvents = events.filter(event => 
            new Date(event.date).toDateString() === currentDay.toDateString()
          );
  
          return (
            <div key={dayIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700 text-center">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  <span className="block md:hidden">
                    {currentDay.toLocaleDateString('es-ES', { weekday: 'narrow' })}
                  </span>
                  <span className="hidden md:block">
                    {currentDay.toLocaleDateString('es-ES', { weekday: 'long' })}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{day}</div>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {Array.from({ length: 24 }).map((_, hour) => {
                  const hourEvents = dayEvents.filter(event => {
                    const eventStartHour = parseInt(event.startTime.split(':')[0]);
                    const eventEndHour = parseInt(event.endTime.split(':')[0]);
                    return hour >= eventStartHour && hour < eventEndHour;
                  });
  
                  return (
                    <div 
                      key={hour} 
                      className={`p-2 transition-colors flex flex-col items-center ${
                        hourEvents.length > 0 
                          ? 'bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => onTimeSlotClick(currentDay, hour)}
                    >
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
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
};
