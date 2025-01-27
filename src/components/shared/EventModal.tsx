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
  if (!isOpen) return null; // No renderizar si el modal está cerrado.

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        
        {/* Encabezado del modal */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-xl font-semibold">
            {selectedEvent ? 'Editar Evento' : 'Nuevo Evento'} - {selectedDate?.toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Campo de título */}
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-1.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Añade un título"
            />
          </div>

          {/* Selector de fecha */}
          {showDatePicker && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
          )}

          {/* Campos de hora inicio y fin */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hora inicio</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hora fin</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Campo de descripción */}
          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-1.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              placeholder="Añade una descripción"
            />
          </div>

          {/* Selector de color */}
          <div>
            <label className="block text-sm font-medium mb-2">Color del evento</label>
            <div className="flex gap-3">
              {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-yellow-500"].map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full ${color} hover:ring-2 ring-offset-2 ring-gray-300 transition-all ${
                    formData.color === color ? 'ring-2' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 p-3 bg-gray-50 rounded-b-xl">
          {selectedEvent && (
            <button
              onClick={() => onDelete(selectedEvent.id)}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Eliminar
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
