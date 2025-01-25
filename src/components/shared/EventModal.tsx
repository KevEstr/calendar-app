import { X } from 'lucide-react';
import { Event } from '../../types/Event';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedEvent: Event | null;
  formData: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    color: string;
  };
  setFormData: (formData: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    color: string;
  }) => void;
  onSubmit: () => void;
  onDelete: (id: string) => void;
}

export const EventModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedEvent,
  formData,
  setFormData,
  onSubmit,
  onDelete
}: EventModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {selectedEvent ? 'Edit Event' : 'Nuevo Evento'} - {selectedDate?.toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Añade un título"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hora inicio</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hora fin</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              placeholder="Añade una descripción"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Color del evento</label>
            <div className="flex gap-3">
              {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-red-500", "bg-yellow-500"].map((color) => (
                <button
                  key={color}
                  onClick={() => setFormData({...formData, color})}
                  className={`w-8 h-8 rounded-full ${color} hover:ring-2 ring-offset-2 ring-gray-300 transition-all ${
                    formData.color === color ? 'ring-2' : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-xl">
          {selectedEvent && (
            <button
              onClick={() => onDelete(selectedEvent.id)}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Delete
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {selectedEvent ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};
