import { useState } from 'react';
import { MiniCalendar } from '../calendar/MiniCalendar';
import { getUpcomingEvents } from '../../utils/eventHelpers';
import { SidebarProps } from '../../types/Layout';

/**
 * Componente Sidebar
 * 
 * Muestra una barra lateral con un calendario miniatura y una lista de próximos eventos.
 * 
 * @param {SidebarProps} props - Propiedades del componente:
 *   - isOpen: Indica si la barra lateral está visible.
 *   - currentStoreDate: Fecha actual seleccionada en la aplicación.
 *   - events: Lista de eventos registrados.
 *   - holidays: Lista de días festivos.
 *   - onDayClick: Función para manejar la selección de un día.
 *   - onEventClick: Función para manejar la selección de un evento.
 *   - onPrevMonth, onNextMonth: Funciones para cambiar el mes en el calendario.
 *   - setShowDatePicker, setIsModalOpen, resetForm: Funciones auxiliares.
 */
export const Sidebar = ({
  isOpen,
  currentStoreDate,
  events,
  holidays,
  onDayClick,
  onEventClick,
  onPrevMonth,
  onNextMonth,
  setShowDatePicker,
  setIsModalOpen,
  resetForm
}: SidebarProps) => {
  const [isCalendarCollapsed, setIsCalendarCollapsed] = useState(true);

  return (
    <aside
      className={`
        ${isOpen ? "block" : "hidden"} 
        md:block bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-300 
        overflow-hidden flex-shrink-0 w-full md:w-64 lg:w-80
      `}
    >
      <MiniCalendar
        currentStoreDate={currentStoreDate}
        events={events}
        holidays={holidays}
        onDayClick={onDayClick}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        isCollapsed={isCalendarCollapsed}
        onToggle={() => setIsCalendarCollapsed(!isCalendarCollapsed)}
        setShowDatePicker={setShowDatePicker}
        setIsModalOpen={setIsModalOpen}
        resetForm={resetForm}
      />

      <div className="p-4 md:p-6 border-t border-gray-100 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Próximos eventos
        </h3>
        <div className="space-y-4">
          {getUpcomingEvents(events).map(event => (
            <div 
              key={event.id}
              onClick={() => onEventClick(event)}
              className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
            >
              <div className={`text-sm font-medium ${event.color.replace('bg-', 'text-')}`}>
                {event.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(event.date).toLocaleDateString('es-ES', { 
                  day: 'numeric',
                  month: 'long'
                })} - {event.startTime}
              </div>
            </div>
          ))}
          
          {getUpcomingEvents(events).length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              No hay eventos próximos
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
