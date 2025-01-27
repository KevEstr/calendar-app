import { X, PencilIcon, TrashIcon } from 'lucide-react';
import { EventPreviewProps } from '../../types/Event';

/**
 * Componente EventPreview
 * 
 * Muestra una vista previa de los eventos de un día seleccionado, 
 * permite editar o eliminar eventos, o crear uno nuevo.
 * 
 * @param {EventPreviewProps} props - Propiedades del componente:
 *   - isOpen: Indica si el modal está visible.
 *   - onClose: Función para cerrar el modal.
 *   - selectedDayEvents: Lista de eventos para el día seleccionado.
 *   - onEditEvent: Función que se ejecuta al hacer clic en el botón de edición de un evento.
 *   - onDeleteEvent: Función que se ejecuta al hacer clic en el botón de eliminar un evento.
 *   - onNewEvent: Función que se ejecuta al hacer clic en el botón de "Nuevo Evento".
 */
export const EventPreview = ({
  isOpen,
  onClose,
  selectedDayEvents,
  onEditEvent,
  onDeleteEvent,
  onNewEvent
}: EventPreviewProps) => {
  // Si el modal no está abierto, no se renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        {/* Encabezado del modal */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Eventos Del Día</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-6 space-y-4">
          {/* Botón para crear un nuevo evento */}
          <button
            onClick={onNewEvent}
            className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nuevo Evento
          </button>

          {/* Lista de eventos para el día seleccionado */}
          {selectedDayEvents.map((event) => (
            <div key={event.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                {/* Información del evento */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{event.title}</h3>
                    {event.status === 'expired' && (
                      <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                        Expirado
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                  <p className="text-sm mt-2">{event.description}</p>
                </div>

                {/* Botones de acción (editar, eliminar) */}
                <div className="flex gap-2">
                  {/* Botón para editar el evento */}
                  <button
                    onClick={() => onEditEvent(event)}
                    className={`p-2 hover:bg-gray-200 rounded-lg ${
                      event.status === 'expired' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={event.status === 'expired'}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>

                  {/* Botón para eliminar el evento */}
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
