/**
 * EventItem - Componente de evento en la vista de calendario
 *
 * Este componente representa un evento individual dentro de un día en la vista mensual del calendario.
 * Permite la interacción para seleccionar eventos y muestra información visual relevante, como su estado y color asociado.
 *
 * Props:
 * - `event`: Objeto de evento que contiene detalles como título, color y estado.
 * - `onEventClick`: Función de callback que se ejecuta al hacer clic en el evento.
 *
 * Funcionalidades clave:
 * - Manejo de clic sin propagar eventos al contenedor padre.
 * - Aplicación dinámica de estilos según el estado del evento (activo/expirado).
 * - Diseño responsivo con diferentes tamaños de fuente y altura según la pantalla.
 */

import { EventItemProps } from '../../types/Event';

export const EventItem = ({ event, onEventClick }: EventItemProps) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();  // Evita que el clic se propague al contenedor padre
        onEventClick(event);  // Llama a la función de clic con los datos del evento
      }}
      className={`
        flex items-center h-4 md:h-5 lg:h-6 px-1 rounded-md text-white 
        text-[8px] md:text-xs lg:text-sm
        ${event.status === 'expired' ? 'bg-gray-400 dark:bg-gray-600 line-through' : event.color}
        hover:brightness-110 transition-all cursor-pointer
      `}
    >
      {/* Indicador visual de evento (punto blanco al lado del título) */}
      <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white dark:bg-white/90 rounded-full mr-1 flex-shrink-0"></span>
      
      {/* Título del evento con truncamiento si excede el espacio disponible */}
      <span className="truncate">{event.title}</span>
    </div>
  );
};
