import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../store/eventsSlice';
import { format } from 'date-fns';

interface EventFormProps {
  selectedDate: Date;
  existingEvent?: { id: string; description: string }; // Optional prop for editing
}

const EventForm: React.FC<EventFormProps> = ({ selectedDate, existingEvent }) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (existingEvent) {
      setDescription(existingEvent.description);
    } else {
      setDescription('');
    }
  }, [existingEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingEvent) {
      dispatch(updateEvent({ id: existingEvent.id, description }));
    } else {
      dispatch(addEvent({ date: format(selectedDate, 'yyyy-MM-dd'), description }));
    }
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
