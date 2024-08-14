import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addEvent } from '../store/eventsSlice';
import EventForm from './EventForm';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<{ id: string; description: string } | null>(null);
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEventToEdit(null); // Clear eventToEdit when changing the date
  };

  const handleEventClick = (event: { id: string; description: string }) => {
    setSelectedDate(new Date(event.date)); // Set the selected date to the event date
    setEventToEdit(event); // Set the event to edit
  };

  return (
    <div>
      <button onClick={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}>Previous</button>
      <button onClick={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}>Next</button>
      <div className="calendar-grid">
        {days.map(day => (
          <div
            key={day.toString()}
            className={`calendar-day ${isToday(day) ? 'today' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
            {events.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
              .map(event => (
                <div key={event.id} className="event-marker" onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}>
                  {event.description}
                </div>
              ))}
          </div>
        ))}
      </div>
      {selectedDate && (
        <EventForm selectedDate={selectedDate} existingEvent={eventToEdit} />
      )}
    </div>
  );
};

export default Calendar;
