import { X } from 'lucide-react';
import { EventModalProps } from '../../types/Event';

/**
 * Componente EventModal
 * 
 * Modal para crear o editar un evento en el calendario.
 * 
 * @param {EventModalProps} props - Propiedades del componente:
 *   - isOpen: Indica si el modal está visible.
 *   - onClose: Función para cerrar el modal.
 *   - selectedDate: Fecha seleccionada para el evento.
 *   - selectedEvent: Evento seleccionado (si se está editando uno existente).
 *   - formData: Estado del formulario de evento.
 *   - setFormData: Función para actualizar los valores del formulario.
 *   - onSubmit: Función para guardar o actualizar un evento.
 *   - onDelete: Función para eliminar un evento.
 *   - showDatePicker: Booleano que indica si se debe mostrar el selector de fecha.
 *   - setSelectedDate: Función para cambiar la fecha seleccionada.
 */
export const EventModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedEvent,
  formData,
  setFormData,
  onSubmit,
  onDelete,
  showDatePicker,
  setSelectedDate
}: EventModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
        
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {selectedEvent ? 'Editar Evento' : 'Nuevo Evento'} - {selectedDate?.toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-1.5 text-base border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Añade un título"
            />
          </div>

          {showDatePicker && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fecha
              </label>
              <input
                type="date"
                className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hora inicio</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 text-base border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hora fin</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2 text-base border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-1.5 text-base border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={2}
              placeholder="Añade una descripción"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color del evento</label>
            <div className="flex gap-3">
              {[
                { value: "bg-blue-500", label: "Azul" },
                { value: "bg-green-500", label: "Verde" },
                { value: "bg-purple-500", label: "Morado" },
                { value: "bg-red-500", label: "Rojo" },
                { value: "bg-yellow-500", label: "Amarillo" }
              ].map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => setFormData({ ...formData, color: colorOption.value })}
                  className={`
                    w-8 h-8 rounded-full ${colorOption.value} 
                    transition-all duration-200
                    hover:scale-110
                    ${formData.color === colorOption.value 
                      ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500 scale-110' 
                      : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-200 dark:hover:ring-gray-600'
                    }
                  `}
                  title={colorOption.label}
                >
                  {formData.color === colorOption.value && (
                    <span className="flex items-center justify-center text-white">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-b-xl">
          {selectedEvent && (
            <button
              onClick={() => onDelete(selectedEvent.id)}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              Eliminar
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {selectedEvent ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
};
