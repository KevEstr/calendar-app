import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addEvent, updateEvent, deleteEvent } from '../store/calendarSlice';
import { Event } from '../types/Event';
import { v4 as uuidv4 } from 'uuid';
import { checkEventOverlap } from '../utils/eventHelpers';

export const useEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.calendar.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    color: 'bg-blue-500'
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      color: 'bg-blue-500'
    });
    setSelectedEvent(null);
  };

  const handleSubmit = (selectedDate: Date) => {
    if (!formData.title || !formData.startTime || !formData.endTime) {
      alert('Por favor, ingrese todos los campos requeridos');
      return;
    }

    if (formData.startTime >= formData.endTime) {
      alert('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateCopy = new Date(selectedDate);
    selectedDateCopy.setHours(0, 0, 0, 0);

    if (selectedDateCopy < today) {
      alert('No se pueden crear eventos en fechas pasadas');
      return;
    }

    const hasOverlap = checkEventOverlap(formData, selectedDate, events, selectedEvent);

    if (hasOverlap) {
      alert('Ya existe un evento programado en este horario');
      return;
    }

    const newEvent: Event = {
      id: selectedEvent?.id || uuidv4(),
      ...formData,
      date: selectedDate
    };

    try {
      if (selectedEvent) {
        dispatch(updateEvent(newEvent));
      } else {
        dispatch(addEvent(newEvent));
      }
      resetForm();
      return true;
    } catch {
      alert('Error al guardar el evento');
      return false;
    }
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      color: event.color
    });
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(id));
      return true;
    }
    return false;
  };

  return {
    events,
    selectedEvent,
    formData,
    setFormData,
    handleSubmit,
    handleEditEvent,
    handleDeleteEvent,
    resetForm
  };
};
