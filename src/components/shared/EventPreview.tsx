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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Eventos Del Día</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col p-6 flex-1 overflow-hidden">
          <button
            onClick={onNewEvent}
            className="w-full px-4 py-2 mb-4 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
          >
            Nuevo Evento
          </button>

          <div className="overflow-y-auto flex-1 pr-2 -mr-2 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
            {selectedDayEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                      <h3 className="font-medium truncate text-gray-900 dark:text-white">{event.title}</h3>
                      {event.status === 'expired' && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex-shrink-0">
                          Expirado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.startTime} - {event.endTime}</p>
                    {event.description && (
                      <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 line-clamp-2">{event.description}</p>
                    )}
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => onEditEvent(event)}
                      className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors ${
                        event.status === 'expired' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={event.status === 'expired'}
                    >
                      <PencilIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
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
    </div>
  );
};
