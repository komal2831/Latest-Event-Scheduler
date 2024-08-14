import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent } from '../store/eventsSlice';
import { format } from 'date-fns';
import '../styles/globals.css';

interface EventFormProps {
  selectedDate: Date;
  existingEvent?: { id: string; startDate: string; endDate: string; description: string };
}

const EventForm: React.FC<EventFormProps> = ({ selectedDate, existingEvent }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (existingEvent) {
      // Populate form with existing event data if available
      setStartDate(existingEvent.startDate);
      setEndDate(existingEvent.endDate);
      setDescription(existingEvent.description);
    } else {
      // Set form dates to the selected date if no existing event
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      setStartDate(formattedDate);
      setEndDate(formattedDate);
    }
  }, [existingEvent, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch action to add or update event based on whether an existing event is provided
    if (existingEvent) {
      dispatch(updateEvent({ id: existingEvent.id, startDate, endDate, description }));
    } else {
      dispatch(addEvent({ startDate, endDate, description }));
    }
    // Clear form fields after submission
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-field"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-field"
        />
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event description"
        className="form-field"
      />
      <button
        type="submit"
        className={`form-button ${existingEvent ? 'update-button' : 'add-button'}`}
      >
        {existingEvent ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
};

export default EventForm;
