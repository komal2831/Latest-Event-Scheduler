import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteEvent } from '../store/eventsSlice';

const EventList: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.description}
            <button onClick={() => dispatch(deleteEvent(event.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
