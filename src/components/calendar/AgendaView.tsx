// Importación de funciones auxiliares para la gestión de eventos del calendario
import { getDaysWithEvents, getDayEvents } from '../../utils/eventHelpers';

// Importación de tipos para definir las propiedades esperadas en el componente
import { AgendaViewProps } from '../../types/Calendar';

/**
 * Componente que muestra una vista de agenda de eventos organizados por día.
 * 
 * Funcionalidades clave:
 * - Agrupa los eventos por día.
 * - Permite la interacción con los eventos para visualización o edición.
 * - Presenta una interfaz adaptable con diferentes tamaños de espacio entre elementos.
 * 
 * @param {AgendaViewProps} props - Propiedades del componente, incluyendo:
 *   - currentStoreDate: Fecha actual seleccionada en el calendario.
 *   - events: Lista de eventos programados.
 *   - onEventClick: Función para manejar el clic en un evento específico.
 */

export const AgendaView = ({ currentStoreDate, events, onEventClick }: AgendaViewProps) => {
  return (
    <div className="max-w-3xl mx-auto space-y-2 md:space-y-4 lg:space-y-6">
      {getDaysWithEvents(events).map((day) => {
        const dayEvents = getDayEvents(day, currentStoreDate, events);

        return (
          <div key={day} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transition-colors duration-200">
            {/* Encabezado con la fecha del día y el mes actual */}
            <div className="bg-gray-50 dark:bg-gray-700 p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg font-medium text-gray-900 dark:text-gray-100">
              {`${day} de ${currentStoreDate.toLocaleString('default', { month: 'long' })}, ${currentStoreDate.getFullYear()}`}
            </div>

            {/* Lista de eventos del día, divididos por líneas para mejor visibilidad */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {dayEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="p-2 md:p-4 lg:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => onEventClick(event)}
                >
                  <div className="text-xs md:text-sm lg:text-base font-medium text-gray-900 dark:text-gray-100">
                    {event.title}
                  </div>
                  <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 dark:text-gray-400">
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
