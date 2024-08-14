import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formatISO } from 'date-fns';

interface Event {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<{ startDate: string; endDate: string; description: string }>) => {
      const newEvent: Event = {
        id: formatISO(new Date()), // Unique ID for the event
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        description: action.payload.description,
      };
      state.events.push(newEvent);
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    updateEvent: (state, action: PayloadAction<{ id: string; startDate: string; endDate: string; description: string }>) => {
      const event = state.events.find(event => event.id === action.payload.id);
      if (event) {
        event.startDate = action.payload.startDate;
        event.endDate = action.payload.endDate;
        event.description = action.payload.description;
      }
    },
  },
});

export const { addEvent, deleteEvent, updateEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
