import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/Event';

interface CalendarState {
  events: Event[]; // Lista de eventos en el calendario
  currentDate: Date; // Fecha actualmente seleccionada
}

const initialState: CalendarState = {
  events: [], // Inicialmente no hay eventos
  currentDate: new Date(), // Fecha por defecto: hoy
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    /**
     * Agrega un nuevo evento al estado si no hay solapamientos con eventos existentes.
     * @param state - Estado actual del calendario.
     * @param action - Evento a agregar.
     */
    addEvent: (state: CalendarState, action: PayloadAction<Event>) => {
      // Convertir las fechas del evento en objetos Date
      const newEvent = {
        ...action.payload,
        date: new Date(action.payload.date),
      };

      // Verificar si hay solapamientos con eventos existentes
      const hasOverlap = state.events.some((e) => {
        const eventDate = new Date(e.date);
        if (eventDate.toDateString() !== newEvent.date.toDateString()) return false; // Diferente día

        return (
          (newEvent.startTime >= e.startTime && newEvent.startTime < e.endTime) || // Hora de inicio dentro de un rango
          (newEvent.endTime > e.startTime && newEvent.endTime <= e.endTime)       // Hora de finalización dentro de un rango
        );
      });

      if (!hasOverlap) {
        state.events.push(newEvent); // Agregar evento si no hay conflictos
      } else {
        throw new Error('Event overlap'); // Lanzar error si hay solapamientos
      }
    },

    /**
     * Actualiza un evento existente por su ID.
     * @param state - Estado actual del calendario.
     * @param action - Evento actualizado.
     */
    updateEvent: (state: CalendarState, action: PayloadAction<Event>) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload; // Reemplazar evento existente
      }
    },

    /**
     * Elimina un evento por su ID.
     * @param state - Estado actual del calendario.
     * @param action - ID del evento a eliminar.
     */
    deleteEvent: (state: CalendarState, action: PayloadAction<string>) => {
      state.events = state.events.filter((e) => e.id !== action.payload); // Filtrar el evento eliminado
    },

    /**
     * Establece la fecha actualmente seleccionada en el calendario.
     * @param state - Estado actual del calendario.
     * @param action - Nueva fecha seleccionada.
     */
    setCurrentDate: (state: CalendarState, action: PayloadAction<Date>) => {
      state.currentDate = action.payload;
    },
  },
});

// Exportar acciones y reducer
export const { addEvent, updateEvent, deleteEvent, setCurrentDate } = calendarSlice.actions;
export default calendarSlice.reducer;
