/**
 * MonthView - Componente de vista mensual del calendario
 *
 * Este componente muestra una cuadrícula de días correspondiente al mes actual,
 * incluyendo eventos y días festivos. Proporciona interactividad para seleccionar días
 * y ver detalles de eventos.
 *
 * Props:
 * - `currentStoreDate`: Fecha actual seleccionada en el calendario.
 * - `events`: Lista de eventos programados para el mes.
 * - `holidays`: Lista de días festivos a destacar.
 * - `onDayClick`: Función de callback cuando se selecciona un día específico.
 * - `onEventClick`: Función de callback cuando se selecciona un evento.
 *
 * Funcionalidades clave:
 * - Renderización dinámica de los días del mes.
 * - Soporte para días festivos con tooltip informativo.
 * - Manejo responsivo con capacidad de ajustar la cantidad de eventos visibles según el tamaño de pantalla.
 */

import { EventItem } from './EventItem';
import { isToday } from '../../utils/dateHelpers';
import { getDayEvents } from '../../utils/eventHelpers';
import { Calendar } from 'lucide-react';
import { MonthViewProps, HolidayChecker, EventSizeCalculator } from '../../types/Calendar';

const getMaxEventsForScreenSize: EventSizeCalculator = () => {
  if (window.innerWidth < 640) return 2;   // Pantallas pequeñas (sm)
  if (window.innerWidth < 1024) return 3;  // Pantallas medianas (md)
  return 4;  // Pantallas grandes (lg)
};

export const MonthView = ({ currentStoreDate, events, holidays, onDayClick, onEventClick }: MonthViewProps) => {
  // Obtener el día de la semana del primer día del mes (0 = domingo, 6 = sábado)
  const firstDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), 1).getDay();

  // Obtener la cantidad total de días en el mes actual
  const daysInMonth = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth() + 1, 0).getDate();

  /**
   * Determina la cantidad máxima de eventos a mostrar según el tamaño de pantalla.
   * - Móviles: 2 eventos
   * - Tablets: 3 eventos
   * - Escritorio: 4 eventos
   * 
   * @returns {number} Cantidad máxima de eventos visibles.
   */


  /**
   * Verifica si un día específico del mes es un día festivo.
   * 
   * @param {number} dayNumber - Número del día del mes.
   * @returns {boolean} `true` si el día es festivo, de lo contrario `false`.
   */
  
  const checkIsHoliday: HolidayChecker = (dayNumber) => {
    return holidays.some(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getDate() === dayNumber && 
             holidayDate.getMonth() === currentStoreDate.getMonth() &&
             holidayDate.getFullYear() === currentStoreDate.getFullYear();
    });
  };
  

  return (
    <div>
      <div className="grid grid-cols-7 mb-2">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 text-center py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px]"></div>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = getDayEvents(day, currentStoreDate, events);
          const isHoliday = checkIsHoliday(day);

          return (
            <button 
              key={day} 
              onClick={() => onDayClick(day)}
              className={`
                min-h-[100px] md:min-h-[120px] lg:min-h-[140px]
                p-1 md:p-2 border border-gray-100 dark:border-gray-700 rounded-lg
                transition-all duration-200 hover:shadow-md
                ${isToday(day, currentStoreDate) ? 'bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-500' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                ${isHoliday ? 'bg-red-50 dark:bg-red-900/30' : ''}
              `}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <span className={`
                    w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full
                    ${isToday(day, currentStoreDate) ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}
                    text-xs md:text-sm font-medium
                  `}>
                    {day}
                  </span>
                  
                  {isHoliday && (
                    <div className="group relative">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                      <div className="hidden group-hover:block absolute z-10 left-0 bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-xs w-[180px] text-left leading-tight dark:text-gray-200">
                      {holidays.find(h => {
                        const holidayDate = new Date(h.date);
                        return holidayDate.getDate() === day && 
                              holidayDate.getMonth() === currentStoreDate.getMonth() &&
                              holidayDate.getFullYear() === currentStoreDate.getFullYear();
                      })?.name}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-h-0">
                  <div className="space-y-1 max-h-[80px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    {dayEvents.slice(0, getMaxEventsForScreenSize()).map((event) => (
                      <EventItem 
                        key={event.id} 
                        event={event} 
                        onEventClick={onEventClick}
                      />
                    ))}
                    {dayEvents.length > getMaxEventsForScreenSize() && (
                      <div className="text-[8px] md:text-xs text-gray-500 dark:text-gray-400 text-center py-0.5 bg-gray-50 dark:bg-gray-700 rounded">
                        +{dayEvents.length - getMaxEventsForScreenSize()} más
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
