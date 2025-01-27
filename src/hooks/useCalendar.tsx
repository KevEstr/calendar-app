import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentDate } from '../store/calendarSlice';

/**
 * Hook personalizado useCalendar
 * 
 * Proporciona lógica y estado relacionados con la gestión del calendario, como la fecha actual, 
 * la vista seleccionada y el manejo de cambios en el calendario.
 * 
 * @returns {Object} Un conjunto de propiedades y funciones para manejar el estado del calendario:
 *   - currentStoreDate: Fecha actual almacenada en el estado global de Redux.
 *   - selectedWeek: Semana actualmente seleccionada (índice).
 *   - setSelectedWeek: Función para actualizar la semana seleccionada.
 *   - currentView: Vista actual del calendario ("month", "week", "day", "agenda").
 *   - setCurrentView: Función para cambiar la vista actual del calendario.
 *   - handlePrevMonth: Cambia el mes actual al mes anterior.
 *   - handleNextMonth: Cambia el mes actual al mes siguiente.
 *   - handleTodayClick: Resetea la fecha actual al día de hoy.
 */
export const useCalendar = () => {
  const dispatch = useDispatch();

  // Selecciona la fecha actual desde el estado global (Redux).
  const currentStoreDate = useSelector((state: RootState) => state.calendar.currentDate);

  // Estado local para la semana seleccionada.
  const [selectedWeek, setSelectedWeek] = useState(0);

  // Estado local para la vista seleccionada del calendario.
  const [currentView, setCurrentView] = useState<"month" | "week" | "day" | "agenda">("month");

  /**
   * Cambia la fecha del calendario al mes anterior.
   */
  const handlePrevMonth = () => {
    const newDate = new Date(currentStoreDate);
    newDate.setMonth(newDate.getMonth() - 1);
    dispatch(setCurrentDate(newDate));
  };

  /**
   * Cambia la fecha del calendario al mes siguiente.
   */
  const handleNextMonth = () => {
    const newDate = new Date(currentStoreDate);
    newDate.setMonth(newDate.getMonth() + 1);
    dispatch(setCurrentDate(newDate));
  };

  /**
   * Cambia la fecha actual del calendario al día de hoy.
   */
  const handleTodayClick = () => {
    dispatch(setCurrentDate(new Date()));
  };

  // Devuelve las propiedades y funciones para su uso en el calendario.
  return {
    currentStoreDate,
    selectedWeek,
    setSelectedWeek,
    currentView,
    setCurrentView,
    handlePrevMonth,
    handleNextMonth,
    handleTodayClick
  };
};
