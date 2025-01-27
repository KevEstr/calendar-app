import { Holiday } from "./Holiday";
import { Event } from "./Event";

// Definición de las propiedades para el componente Header
export interface HeaderProps {
    currentView: "month" | "week" | "day" | "agenda";
    setCurrentView: (view: "month" | "week" | "day" | "agenda") => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onMenuClick: () => void;
}

// Definición de las propiedades para el componente Sidebar
export interface SidebarProps {
  isOpen: boolean;
  currentStoreDate: Date;
  events: Event[];
  holidays: Holiday[];
  onDayClick: (day: number) => void;
  onEventClick: (event: Event) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  setShowDatePicker: (show: boolean) => void;
  setIsModalOpen: (open: boolean) => void;
  resetForm: () => void;
}
