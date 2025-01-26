import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import { useCalendar } from "./hooks/useCalendar";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { MonthView } from "./components/calendar/MonthView";
import { WeekView } from "./components/calendar/WeekView";
import { AgendaView } from "./components/calendar/AgendaView";
import { EventModal } from "./components/shared/EventModal";
import { EventPreview } from "./components/shared/EventPreview";
import { Event } from './types/Event';
import "./App.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState<Event[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    handleTodayClick
  } = useCalendar();

  const handleDayClick = (day: number) => {
    const dayEvents = events.filter((event: Event) => {
      const eventDate = new Date(event.date);
      const targetDate = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), day);
      return eventDate.toDateString() === targetDate.toDateString();
    });

    if (dayEvents.length > 0) {
      setSelectedDayEvents(dayEvents);
      setIsPreviewOpen(true);
    } else {
      const selectedDate = new Date(currentStoreDate.getFullYear(), currentStoreDate.getMonth(), day);
      setSelectedDate(selectedDate);
      setIsModalOpen(true);
      resetForm();
    }
  };

  const renderView = () => {
    switch (currentView) {
      case "month":
        return (
          <MonthView
            currentStoreDate={currentStoreDate}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEditEvent}
          />
        );
      case "week":
        return (
          <WeekView
            currentStoreDate={currentStoreDate}
            events={events}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            onEventClick={handleEditEvent}
            onTimeSlotClick={(date, hour) => {
              setSelectedDate(date);
              setFormData({...formData, startTime: `${hour.toString().padStart(2, '0')}:00`});
              setIsModalOpen(true);
            }}
          />
        );
      case "agenda":
        return (
          <AgendaView
            currentStoreDate={currentStoreDate}
            events={events}
            onEventClick={handleEditEvent}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onTodayClick={handleTodayClick}
        onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className="max-w-7xl mx-auto mt-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar
            isOpen={isSidebarOpen}
            currentStoreDate={currentStoreDate}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEditEvent}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            setShowDatePicker={setShowDatePicker}
            setIsModalOpen={setIsModalOpen}
            resetForm={resetForm}
          />

          <div className="flex-1">
            <main className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="text-center py-6 md:py-8 border-b">
              <div className="flex items-center justify-center gap-4">
                <div className="flex gap-1">
                  <button 
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
                  </button>

                </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {currentStoreDate.toLocaleString('es-ES', { 
                        month: 'long', 
                        year: 'numeric' 
                      }).replace(/^\w/, (c: string) => c.toUpperCase())}
                    </h2>

                    <button 
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-gray-600" />
                    </button>

                  </div>
                  
                </div>
                <div className="px-4 md:px-6 lg:px-8">
                  <div className="pb-6 md:pb-8 lg:pb-10">{renderView()}</div>
                </div>
              </main>
            </div>
          </div>
        </div>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setShowDatePicker(false);
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
              setIsModalOpen(false);
              setShowDatePicker(false);
            }
          }}
          onDelete={handleDeleteEvent}
        />

      <EventPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        selectedDayEvents={selectedDayEvents}
        onEditEvent={(event) => {
          handleEditEvent(event);
          setIsPreviewOpen(false);
          setIsModalOpen(true);
        }}
        onDeleteEvent={(id) => {
          handleDeleteEvent(id);
          setIsPreviewOpen(false);
        }}
        onNewEvent={() => {
          setIsPreviewOpen(false);
          setIsModalOpen(true);
          resetForm();
        }}
      />
    </div>
  );
}
