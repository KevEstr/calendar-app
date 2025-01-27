// Representa un evento en el calendario con sus detalles básicos
export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: Date;
  color: string;
  status: 'active' | 'expired';
}

// Props para el modal de evento, gestionando la creación, edición y eliminación de eventos
export interface EventModalProps {
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
  showDatePicker: boolean;
  setSelectedDate: (date: Date) => void;
}

// Props para la vista previa de eventos, mostrando los eventos del día seleccionado
export interface EventPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDayEvents: Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  onNewEvent: () => void;
}

// Props para el selector de semanas, permitiendo elegir la semana actual en la vista
export interface WeekSelectorProps {
  weeks: (number | null)[][];
  selectedWeek: number;
  onWeekSelect: (weekIndex: number) => void;
}
