import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addEvent, updateEvent, deleteEvent } from '../store/calendarSlice';
import { Event } from '../types/Event';
import { v4 as uuidv4 } from 'uuid';
import { checkEventOverlap } from '../utils/eventHelpers';

/**
 * Hook personalizado para gestionar los eventos del calendario.
 * Incluye creación, edición, eliminación y validaciones.
 */
export const useEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.calendar.events); // Eventos almacenados en Redux.
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Evento seleccionado para editar.
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    color: 'bg-blue-500',
  });

  /**
   * Valida y actualiza el estado de los eventos expirados cada minuto.
   */
  useEffect(() => {
    const checkExpiredEvents = () => {
      const now = new Date();
      events.forEach((event) => {
        const eventDate = new Date(event.date);
        const [hours, minutes] = event.endTime.split(':').map(Number);
        eventDate.setHours(hours, minutes);

        if (eventDate < now) {
          dispatch(updateEvent({ ...event, status: 'expired' }));
        }
      });
    };

    const interval = setInterval(checkExpiredEvents, 60000);
    return () => clearInterval(interval); // Limpia el intervalo al desmontar.
  }, [events, dispatch]);

  /**
   * Reinicia el formulario y elimina el evento seleccionado.
   */
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      color: 'bg-blue-500',
    });
    setSelectedEvent(null);
  };

  /**
   * Maneja la creación o edición de un evento.
   * @param selectedDate - Fecha seleccionada para el evento.
   * @returns {boolean} - Indica si la operación fue exitosa.
   */
  const handleSubmit = (selectedDate: Date) => {
    if (!formData.title || !formData.startTime || !formData.endTime) {
      alert('Por favor, ingrese todos los campos requeridos');
      return false;
    }

    if (formData.startTime >= formData.endTime) {
      alert('La hora de finalización debe ser posterior a la hora de inicio');
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateCopy = new Date(selectedDate);
    selectedDateCopy.setHours(0, 0, 0, 0);

    if (selectedDateCopy < today) {
      alert('No se pueden crear eventos en fechas pasadas');
      return false;
    }

    const hasOverlap = checkEventOverlap(formData, selectedDate, events, selectedEvent);
    if (hasOverlap) {
      alert('Ya existe un evento programado en este horario');
      return false;
    }

    const newEvent: Event = {
      id: selectedEvent?.id || uuidv4(), // Genera un ID único si es un nuevo evento.
      ...formData,
      date: selectedDate,
      status: 'active',
    };

    try {
      if (selectedEvent) {
        dispatch(updateEvent(newEvent)); // Actualiza el evento existente.
      } else {
        dispatch(addEvent(newEvent)); // Añade un nuevo evento.
      }
      resetForm();
      return true;
    } catch {
      alert('Error al guardar el evento');
      return false;
    }
  };

  /**
   * Prepara el formulario para editar un evento existente.
   * @param event - Evento a editar.
   */
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      color: event.color,
    });
  };

  /**
   * Elimina un evento seleccionado.
   * @param id - ID del evento a eliminar.
   * @returns {boolean} - Indica si la eliminación fue confirmada.
   */
  const handleDeleteEvent = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este evento?')) {
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
    resetForm,
  };
};
