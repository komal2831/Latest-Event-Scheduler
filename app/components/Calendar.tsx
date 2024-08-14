import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isWithinInterval, isSameDay, addMonths } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import EventForm from './EventForm';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventToEdit, setEventToEdit] = useState<{ id: string; startDate: string; endDate: string; description: string } | null>(null);
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);

  // Calculate start and end of the current month
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start, end });

  // Filter events that span the current month
  const filteredEvents = events.filter(event => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);

    return isWithinInterval(eventStart, { start, end }) ||
           isWithinInterval(eventEnd, { start, end }) ||
           (eventStart < start && eventEnd > end);
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setEventToEdit(null);
  };

  const handleEventClick = (event: { id: string; startDate: string; endDate: string; description: string }) => {
    setSelectedDate(new Date(event.startDate)); 
    setEventToEdit(event); 
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  return (
    <div>
      <button onClick={handlePreviousMonth}>Previous</button>
      <button onClick={handleNextMonth}>Next</button>
      <div className="calendar-grid">
        {days.map(day => (
          <div
            key={day.toString()}
            className={`calendar-day ${isToday(day) ? 'today' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, 'd')}
            {filteredEvents.filter(event =>
              isWithinInterval(day, { start: new Date(event.startDate), end: new Date(event.endDate) }) ||
              isSameDay(day, new Date(event.startDate)) ||
              isSameDay(day, new Date(event.endDate))
            ).map(event => (
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
