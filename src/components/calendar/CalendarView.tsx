// Importación de las vistas disponibles para el calendario
import { MonthView } from "./MonthView";
import { WeekView } from "./WeekView";
import { AgendaView } from "./AgendaView";

// Importación de las propiedades tipadas para el componente CalendarView
import { CalendarViewProps } from "../../types/Calendar";

/**
 * Componente que muestra la vista del calendario según la opción seleccionada.
 * 
 * Funcionalidades clave:
 * - Renderiza la vista mensual, semanal o de agenda según la propiedad `currentView`.
 * - Gestiona la interacción del usuario con los eventos y la selección de fechas.
 * - Proporciona la capacidad de abrir modales para agregar o editar eventos.
 * 
 * @param {CalendarViewProps} props - Propiedades del componente, incluyendo:
 *   - currentView: Vista actual seleccionada (mes, semana o agenda).
 *   - currentStoreDate: Fecha actual almacenada en el calendario.
 *   - events: Lista de eventos programados.
 *   - holidays: Lista de días festivos.
 *   - selectedWeek: Semana seleccionada en la vista semanal.
 *   - setSelectedWeek: Función para actualizar la semana seleccionada.
 *   - formData: Datos del formulario de eventos.
 *   - onDayClick: Función para manejar la selección de un día.
 *   - onEventClick: Función para manejar la selección de un evento.
 *   - setSelectedDate: Función para establecer la fecha seleccionada.
 *   - setFormData: Función para actualizar el formulario de eventos.
 *   - openModal: Función para abrir el modal de creación/edición de eventos.
 */
export const CalendarView = ({
  currentView,
  currentStoreDate,
  events,
  holidays,
  selectedWeek,
  setSelectedWeek,
  formData,
  onDayClick,
  onEventClick,
  setSelectedDate,
  setFormData,
  openModal
}: CalendarViewProps) => {
  switch (currentView) {
    // Renderiza la vista mensual del calendario
    case "month":
      return (
        <MonthView
          currentStoreDate={currentStoreDate}
          events={events}
          holidays={holidays}
          onDayClick={onDayClick}
          onEventClick={onEventClick}
        />
      );

    // Renderiza la vista semanal del calendario
    case "week":
      return (
        <WeekView
          currentStoreDate={currentStoreDate}
          events={events}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          onEventClick={onEventClick}
          onTimeSlotClick={(date, hour) => {
            setSelectedDate(date);  // Establece la fecha seleccionada
            setFormData({...formData, startTime: `${hour.toString().padStart(2, '0')}:00`});  // Formatea la hora seleccionada
            openModal();  // Abre el modal de evento
          }}
        />
      );

    // Renderiza la vista de agenda con los eventos organizados por día
    case "agenda":
      return (
        <AgendaView
          currentStoreDate={currentStoreDate}
          events={events}
          onEventClick={onEventClick}
        />
      );

    // En caso de que no haya una vista válida, no renderiza nada
    default:
      return null;
  }
};