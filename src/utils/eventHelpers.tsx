import { Event } from '../types/Event';

/**
 * Filtra los eventos que ocurren en un día específico dentro de un mes determinado.
 * 
 * @param {number} day - Día del mes para el cual se desean obtener los eventos.
 * @param {Date} currentDate - Fecha de referencia para obtener el mes y el año.
 * @param {Event[]} events - Lista de eventos a evaluar.
 * @returns {Event[]} - Lista de eventos que ocurren en el día especificado.
 * 
 * Ejemplo:
 * getDayEvents(15, new Date(2025, 0, 1), events) // Devuelve los eventos que ocurren el 15 de enero de 2025.
 */
export const getDayEvents = (day: number, currentDate: Date, events: Event[]) => {
  const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === targetDate.toDateString();
  });
};

/**
 * Obtiene todos los días del mes que tienen eventos programados.
 * 
 * @param {Event[]} events - Lista de eventos a evaluar.
 * @returns {number[]} - Lista de días del mes (1-31) que tienen eventos programados.
 * 
 * Ejemplo:
 * getDaysWithEvents(events) // Devuelve un array de días que tienen al menos un evento.
 */
export const getDaysWithEvents = (events: Event[]) => {
  const daysSet = new Set(
    events.map(event => new Date(event.date).getDate())
  );
  return Array.from(daysSet);
};

/**
 * Filtra y devuelve los próximos 5 eventos programados que ocurrirán a partir del momento actual.
 * Los eventos se ordenan por fecha y hora de inicio.
 * 
 * @param {Event[]} events - Lista de eventos a evaluar.
 * @returns {Event[]} - Los próximos 5 eventos en orden cronológico.
 * 
 * Ejemplo:
 * getUpcomingEvents(events) // Devuelve los próximos 5 eventos ordenados cronológicamente.
 */
export const getUpcomingEvents = (events: Event[]) => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
};

/**
 * Verifica si hay eventos solapados con un nuevo evento que se está intentando programar.
 * Compara las horas de inicio y fin de un evento propuesto con los eventos ya programados.
 * 
 * @param {Object} formData - Datos del formulario del nuevo evento, incluyendo la hora de inicio y fin.
 * @param {string} formData.startTime - Hora de inicio del evento propuesto.
 * @param {string} formData.endTime - Hora de fin del evento propuesto.
 * @param {Date} selectedDate - Fecha seleccionada para el evento.
 * @param {Event[]} events - Lista de eventos ya programados.
 * @param {Event | null} selectedEvent - Evento seleccionado actualmente, si existe.
 * @returns {boolean} - Devuelve true si hay solapamiento de horarios, de lo contrario false.
 * 
 * Ejemplo:
 * checkEventOverlap({ startTime: '10:00', endTime: '12:00' }, new Date(2025, 0, 15), events, selectedEvent) 
 * // Devuelve true si el evento propuesto se solapa con algún evento ya programado en la misma fecha.
 */
export const checkEventOverlap = (
  formData: { startTime: string; endTime: string }, 
  selectedDate: Date, 
  events: Event[], 
  selectedEvent: Event | null
) => {
  return events.some(event => {
    const sameDay = new Date(event.date).toDateString() === selectedDate?.toDateString();
    if (!sameDay) return false;

    const eventStart = event.startTime;
    const eventEnd = event.endTime;

    // Si el evento seleccionado es el mismo, no se debe verificar el solapamiento con él.
    if (selectedEvent && event.id === selectedEvent.id) return false;

    // Verifica el solapamiento entre los horarios de los eventos.
    return (
      (formData.startTime >= eventStart && formData.startTime < eventEnd) ||
      (formData.endTime > eventStart && formData.endTime <= eventEnd) ||
      (formData.startTime <= eventStart && formData.endTime >= eventEnd)
    );
  });
};
