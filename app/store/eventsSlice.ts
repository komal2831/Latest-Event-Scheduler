import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  date: Date;
  description: string;
}

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: []
};

// Create a slice of the Redux store for managing events
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<Event[]>) {
      state.events = action.payload;
    },
    addEvent(state, action: PayloadAction<Event>) {
      state.events.push(action.payload);
    },
    editEvent(state, action: PayloadAction<{ index: number; newDescription: string; newDate: Date }>) {
      const { index, newDescription, newDate } = action.payload;
      state.events[index] = { ...state.events[index], description: newDescription, date: newDate };
    },
    deleteEvent(state, action: PayloadAction<number>) {
      state.events = state.events.filter((_, i) => i !== action.payload);
    }
  }
});


export const { setEvents, addEvent, editEvent, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
