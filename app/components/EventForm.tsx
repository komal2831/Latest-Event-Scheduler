import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../store/eventsSlice';
import { format } from 'date-fns';

interface EventFormProps {
  selectedDate: Date;
  existingEvent?: { id: string; startDate: string; endDate: string; description: string }; // Optional prop for editing
}

const EventForm: React.FC<EventFormProps> = ({ selectedDate, existingEvent }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (existingEvent) {
      setStartDate(existingEvent.startDate);
      setEndDate(existingEvent.endDate);
      setDescription(existingEvent.description);
    } else {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      setStartDate(formattedDate);
      setEndDate(formattedDate);
    }
  }, [existingEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingEvent) {
      dispatch(updateEvent({ id: existingEvent.id, startDate, endDate, description }));
    } else {
      dispatch(addEvent({ startDate, endDate, description }));
    }
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event description"
      />
      <button type="submit">{existingEvent ? 'Update Event' : 'Add Event'}</button>
    </form>
  );
};

export default EventForm;
