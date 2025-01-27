import { useState } from 'react';
import { Event } from '../types/Event';

/**
 * Hook personalizado para gestionar el estado del calendario.
 * 
 * Proporciona estados y funciones relacionados con la barra lateral, el modal,
 * la vista previa, y los eventos seleccionados.
 */
export const useCalendarState = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Estado para la visibilidad de la barra lateral.
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal.
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Estado para la vista previa de un evento.
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Fecha seleccionada en el calendario.
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]); // Eventos asociados a la fecha seleccionada.
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla la visibilidad del selector de fecha.

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const openPreview = () => setIsPreviewOpen(true);

  const closePreview = () => setIsPreviewOpen(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return {
    // Estados principales
    isSidebarOpen,
    isModalOpen,
    isPreviewOpen,
    selectedDate,
    selectedDayEvents,
    showDatePicker,

    // Setters
    setSidebarOpen,
    setSelectedDate,
    setSelectedDayEvents,
    setShowDatePicker,

    // Acciones
    openModal,
    closeModal,
    openPreview,
    closePreview,
    toggleSidebar,
  };
};
