import { Event } from './Event';
import { Holiday } from './Holiday';

// Props para la vista de la agenda, mostrando eventos y manejando clics
export interface AgendaViewProps {
  currentStoreDate: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
}

// Props para el encabezado del calendario, con funcionalidades para navegar entre meses
export interface CalendarHeaderProps {
  currentStoreDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

// Datos del formulario de creación/edición de eventos
export interface FormData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  color: string;
}

// Props para la vista completa del calendario, que incluye eventos, días festivos y otras funcionalidades
export interface CalendarViewProps {
  currentView: string;
  currentStoreDate: Date;
  events: Event[];
  holidays: Holiday[];
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  formData: FormData;
  onDayClick: (day: number) => void;
  onEventClick: (event: Event) => void;
  setSelectedDate: (date: Date) => void;
  setFormData: (data: FormData) => void;
  openModal: () => void;
}

// Props para un mini calendario con opciones de navegación y visibilidad colapsable
export interface MiniCalendarProps {
  currentStoreDate: Date;
  events: Event[];
  holidays: Holiday[];
  onDayClick: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
  setShowDatePicker: (show: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
  resetForm: () => void;
}

// Props para la vista de mes, mostrando días y eventos del mes actual
export interface MonthViewProps {
  currentStoreDate: Date;
  events: Event[];
  holidays: Holiday[];
  onDayClick: (day: number) => void;
  onEventClick: (event: Event) => void;
}

// Props para la vista de semana, mostrando los eventos y la selección de franjas horarias
export interface WeekViewProps {
  currentStoreDate: Date;
  events: Event[];
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
  onEventClick: (event: Event) => void;
  onTimeSlotClick: (date: Date, hour: number) => void;
}

// Veriicar que días son festivos por medio de la API
export type HolidayChecker = (dayNumber: number) => boolean;

// Calcular la cantidad de eventos por día para mejorar lo responsive
export type EventSizeCalculator = () => number;
