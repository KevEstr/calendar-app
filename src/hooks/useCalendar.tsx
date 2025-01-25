import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setCurrentDate } from '../store/calendarSlice';

export const useCalendar = () => {
  const dispatch = useDispatch();
  const currentStoreDate = useSelector((state: RootState) => state.calendar.currentDate);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [currentView, setCurrentView] = useState<"month" | "week" | "day" | "agenda">("month");

  const handlePrevMonth = () => {
    const newDate = new Date(currentStoreDate);
    newDate.setMonth(newDate.getMonth() - 1);
    dispatch(setCurrentDate(newDate));
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentStoreDate);
    newDate.setMonth(newDate.getMonth() + 1);
    dispatch(setCurrentDate(newDate));
  };

  const handleTodayClick = () => {
    dispatch(setCurrentDate(new Date()));
  };

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
