import { Event } from '../types/Event';

export const getDayEvents = (day: number, currentDate: Date, events: Event[]) => {
  const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === targetDate.toDateString();
  });
};

export const getDaysWithEvents = (events: Event[]) => {
  const daysSet = new Set(
    events.map(event => new Date(event.date).getDate())
  );
  return Array.from(daysSet);
};

export const getUpcomingEvents = (events: Event[]) => {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
};

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

    if (selectedEvent && event.id === selectedEvent.id) return false;

    return (
      (formData.startTime >= eventStart && formData.startTime < eventEnd) ||
      (formData.endTime > eventStart && formData.endTime <= eventEnd) ||
      (formData.startTime <= eventStart && formData.endTime >= eventEnd)
    );
  });
};
