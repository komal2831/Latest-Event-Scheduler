'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../store/eventsSlice';
import { AppDispatch } from '../store/store';
import './EventTable.css';

interface EventFormProps {
  selectedDate: Date;
}

/**
 * EventForm component allows users to add events for the selected date.
 * It includes a textarea for entering the event description and a submit button.
 * On form submission, the event is dispatched to the Redux store.
 * 
 * @param {EventFormProps} props - Contains the selected date for the event.
 */
const EventForm: React.FC<EventFormProps> = ({ selectedDate }) => {
  const [description, setDescription] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      dispatch(addEvent({ date: selectedDate, description }));
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="eventForm">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event description"
        className="eventFormTextarea"
      />
      <button type="submit" className="eventFormButton">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
