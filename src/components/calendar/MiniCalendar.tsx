import { ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { getDaysWithEvents } from '../../utils/eventHelpers';
import { isToday } from '../../utils/dateHelpers';
import { MiniCalendarProps } from '../../types/Calendar';

/**
 * Componente MiniCalendar
 * 
 * Este componente muestra un calendario con la capacidad de navegar entre meses,
 * visualizar eventos y festivos, y crear nuevos eventos rápidamente.
 * 
 * @param {MiniCalendarProps} props - Propiedades del componente:
 *   - currentStoreDate: Fecha actual del calendario.
 *   - events: Lista de eventos del mes.
 *   - holidays: Lista de días festivos.
 *   - onDayClick: Función para manejar clics en los días del calendario.
 *   - onPrevMonth: Función para cambiar al mes anterior.
 *   - onNextMonth: Función para cambiar al mes siguiente.
 *   - isCollapsed: Indica si el calendario está colapsado en móviles.
 *   - onToggle: Función para mostrar/ocultar el calendario en dispositivos móviles.
 *   - setShowDatePicker: Función para abrir el selector de fecha.
 *   - setIsModalOpen: Función para abrir el modal de creación de eventos.
 *   - resetForm: Función para reiniciar el formulario de eventos.
 */
export const MiniCalendar = ({ 
  currentStoreDate, 
  events, 
  holidays,
  onDayClick, 
  onPrevMonth, 
  onNextMonth,
  isCollapsed = false,
  onToggle,
  setShowDatePicker,
  setIsModalOpen,
  resetForm
}: MiniCalendarProps) => {

  // Obtiene el día de la semana en que comienza el mes (0 = domingo, 1 = lunes, etc.)
  const firstDay = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), 1).getDay();
  
  // Obtiene la cantidad de días en el mes actual
  const daysInMonth = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth() + 1, 0).getDate();

  return (
    <div className="border-b border-gray-200">
      {/* Botón para expandir/colapsar el calendario en móviles */}
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

      {/* Contenido del calendario, oculto en móviles si está colapsado */}
      <div className={`${isCollapsed ? 'hidden' : 'block'} md:block`}>
        <div className="p-2 md:p-4">

          {/* Encabezado del calendario con navegación entre meses */}
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

          {/* Botón para crear eventos rápidamente */}
          <button
            onClick={() => {
              setShowDatePicker(true); // Abre el selector de fecha
              setIsModalOpen(true); // Abre el modal de evento
              resetForm(); // Restablece el formulario
            }}
            className="w-full mb-4 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Crear evento rápido
          </button>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-sm mb-1 md:mb-2">
            {["D", "L", "M", "W", "J", "V", "S"].map((day) => (
              <div key={day} className="text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center text-xs md:text-sm">
            {/* Espacios vacíos para los días antes del primer día del mes */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}

            {/* Días numerados del mes */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;

              // Determina si el día es un festivo
              const isHoliday = holidays.some(holiday => {
                const holidayDate = new Date(holiday.date);
                return holidayDate.getDate() === day && 
                      holidayDate.getMonth() === currentStoreDate.getMonth();
              });

              return (
                <div
                  key={day}
                  onClick={() => onDayClick(day)}
                  className={`
                    aspect-square flex items-center justify-center rounded-full relative
                    ${getDaysWithEvents(events).includes(day) ? "bg-blue-100 text-blue-700 font-medium" : ""}
                    ${isToday(day, currentStoreDate) ? "bg-blue-600 text-white font-medium" : ""}
                    ${isHoliday ? "border border-red-400" : ""}
                    hover:bg-gray-100 cursor-pointer transition-all
                    group
                  `}
                >
                  {day}
                  {/* Muestra el nombre del festivo al pasar el cursor */}
                  {isHoliday && (
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs z-10 whitespace-nowrap">
                      {holidays.find(h => new Date(h.date).getDate() === day)?.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
