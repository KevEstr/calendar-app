import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';

// Configuración de la tienda de Redux
export const store = configureStore({
  reducer: {
    calendar: calendarReducer, // Reducer del calendario
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Deshabilitar la verificación de serialización para evitar errores con datos no serializables
    }),
});

// Tipos de la tienda
export type RootState = ReturnType<typeof store.getState>; // Estado global de la tienda
export type AppDispatch = typeof store.dispatch; // Tipo de despachador de acciones
