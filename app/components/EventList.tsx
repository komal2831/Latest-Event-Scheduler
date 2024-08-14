import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteEvent } from '../store/eventsSlice';
import '../styles/globals.css';

const EventList: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch();
  console.log(events,"sdjgsfdsjfsfsd")

  return (
<div className="event-container">
  <h2>Event List</h2>
  {events.length > 0 ? (
    <table className="event-table">
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.id}>
            <td>{event.startDate}</td>
            <td>{event.endDate}</td>
            <td>{event.description}</td>
            <td>
              <button onClick={() => dispatch(deleteEvent(event.id))}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="no-events">No events found</p>
  )}
</div>



  );
};

export default EventList;
