import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Event } from '../types/Event'

interface CalendarState {
  events: Event[]
  currentDate: Date
}

const initialState: CalendarState = {
  events: [],
  currentDate: new Date()
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      // Convert date strings back to Date objects
      const newEvent = {
        ...action.payload,
        date: new Date(action.payload.date)
      }
      
      const hasOverlap = state.events.some((e) => {
        const eventDate = new Date(e.date)
        if (eventDate.toDateString() !== newEvent.date.toDateString()) return false
        return (
          (newEvent.startTime >= e.startTime && newEvent.startTime < e.endTime) ||
          (newEvent.endTime > e.startTime && newEvent.endTime <= e.endTime)
        )
      })
    
      if (!hasOverlap) {
        state.events.push(newEvent)
      } else {
        throw new Error('Event overlap')
      }
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id)
      if (index !== -1) {
        state.events[index] = action.payload
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload)
    },
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      state.currentDate = action.payload
    }
  }
})

export const { addEvent, updateEvent, deleteEvent, setCurrentDate } = calendarSlice.actions
export default calendarSlice.reducer
