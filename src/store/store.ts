import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
