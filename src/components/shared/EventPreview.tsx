import { X, PencilIcon, TrashIcon } from 'lucide-react';
import { Event } from '../../types/Event';

interface EventPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDayEvents: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  onNewEvent: () => void;
}

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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Eventos Del Día</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <button
            onClick={onNewEvent}
            className="w-full px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nuevo Evento
          </button>
          {selectedDayEvents.map((event) => (
            <div key={event.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.startTime} - {event.endTime}</p>
                  <p className="text-sm mt-2">{event.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditEvent(event)}
                    className="p-2 hover:bg-gray-200 rounded-lg"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
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
