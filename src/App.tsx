// Importación de hooks personalizados para la gestión del estado del calendario y eventos
import { useEvents } from "./hooks/useEvents";
import { useCalendar } from "./hooks/useCalendar";
import { useCalendarState } from "./hooks/useCalendarState";
import { useEffect } from "react";

// Importación de componentes de diseño y UI
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { EventModal } from "./components/shared/EventModal";
import { EventPreview } from "./components/shared/EventPreview";
import { CalendarHeader } from "./components/calendar/CalendarHeader";
import { CalendarView } from "./components/calendar/CalendarView";

// Importación de estilos y tipos globales
import "./styles/App.css";
import { useHolidays } from './hooks/useHolidays';
import { Event } from './types/Event';

/**
 * Componente principal de la app del calendario.
 * Administra la vista principal y las interacciones del usuario con eventos y fechas.
 * 
 * Funcionalidades clave:
 * - Manejo del estado global del calendario.
 * - Visualización de eventos en diferentes vistas.
 * - Apertura y cierre de modales para creación y edición de eventos.
 * - Estilos con tailwind y responsive para todo tipo de pantalla.
 */

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])
  
  // Estados del calendario: fechas seleccionadas, visibilidad de modales y barra lateral
  const {
    isSidebarOpen,
    isModalOpen,
    isPreviewOpen,
    selectedDate,
    selectedDayEvents,
    showDatePicker,
    setSelectedDate,
    setSelectedDayEvents,
    setShowDatePicker,
    openModal,
    closeModal,
    openPreview,
    closePreview,
    toggleSidebar
  } = useCalendarState();

  const {
    events,
    selectedEvent,
    formData,
    setFormData,
    handleSubmit,
    handleEditEvent,
    handleDeleteEvent,
    resetForm
  } = useEvents();

  const {
    currentStoreDate,
    selectedWeek,
    setSelectedWeek,
    currentView,
    setCurrentView,
    handlePrevMonth,
    handleNextMonth,
  } = useCalendar();

  /**
   * Maneja la selección de un día específico en el calendario.
   * - Si existen eventos en la fecha seleccionada, se abre la vista previa de eventos.
   * - Si no hay eventos, se abre el modal de creación de eventos.
   * 
   * @param {number} day - Día seleccionado en el calendario.
   */

  const handleDayClick = (day: number) => {
    const dayEvents = events.filter((event: Event) => {
      const eventDate = new Date(event.date);
      const targetDate = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), day);
      return eventDate.toDateString() === targetDate.toDateString();
    });

    if (dayEvents.length > 0) {
      setSelectedDayEvents(dayEvents);
      openPreview();
    } else {
      const selectedDate = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), day);
      setSelectedDate(selectedDate);
      openModal();
      resetForm();
    }
  };

  const holidays = useHolidays(currentStoreDate.getFullYear());

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Sección de encabezado que incluye controles de navegación del calendario */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onMenuClick={toggleSidebar}
      />

      <div className="max-w-7xl mx-auto mt-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Barra lateral con lista de eventos y opciones de navegación */}
          <Sidebar
            isOpen={isSidebarOpen}
            currentStoreDate={currentStoreDate}
            events={events}
            holidays={holidays}
            onDayClick={handleDayClick}
            onEventClick={handleEditEvent}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            setShowDatePicker={setShowDatePicker}
            setIsModalOpen={openModal}
            resetForm={resetForm}
          />

          {/* Sección principal que muestra la vista del calendario */}
          <div className="flex-1">
            <main className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-colors duration-200">
              <CalendarHeader 
                currentStoreDate={currentStoreDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />
              <div className="px-4 md:px-6 lg:px-8">
                <div className="pb-6 md:pb-8 lg:pb-10">
                  <CalendarView
                    currentView={currentView}
                    currentStoreDate={currentStoreDate}
                    events={events}
                    holidays={holidays}
                    selectedWeek={selectedWeek}
                    setSelectedWeek={setSelectedWeek}
                    formData={formData}
                    onDayClick={handleDayClick}
                    onEventClick={handleEditEvent}
                    setSelectedDate={setSelectedDate}
                    setFormData={setFormData}
                    openModal={openModal}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Modales para creación y vista previa de eventos */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          setShowDatePicker(false);
          setSelectedDate(null);
          resetForm();
        }}
        selectedDate={selectedDate}
        selectedEvent={selectedEvent}
        formData={formData}
        setFormData={setFormData}
        showDatePicker={showDatePicker}
        setSelectedDate={setSelectedDate}
        onSubmit={() => {
          if (handleSubmit(selectedDate!)) {
            closeModal();
            setShowDatePicker(false);
          }
        }}
        onDelete={handleDeleteEvent}
      />

      <EventPreview
        isOpen={isPreviewOpen}
        onClose={closePreview}
        selectedDayEvents={selectedDayEvents}
        onEditEvent={(event) => {
          handleEditEvent(event);
          closePreview();
          openModal();
        }}
        onDeleteEvent={(id) => {
          handleDeleteEvent(id);
          closePreview();
        }}
        onNewEvent={() => {
          setSelectedDate(new Date(selectedDayEvents[0].date));
          closePreview();
          openModal();
          resetForm();
        }}
      />
    </div>
  );
}
