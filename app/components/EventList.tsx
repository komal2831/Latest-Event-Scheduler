import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { editEvent, deleteEvent } from '../store/eventsSlice';
import './EventTable.css';
import { format } from 'date-fns';

interface EventListProps {
  selectedDate: Date;
}

const EventList: React.FC<EventListProps> = ({ selectedDate }) => {
  // Retrieve the list of events from the Redux store
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch: AppDispatch = useDispatch();

  // Function to handle editing an event
  const handleEditEvent = (index: number) => {
    const event = events[index];
    const newDescription = prompt('Edit event description:', event.description);
    const currentDate = format(event.date, 'yyyy-MM-dd');
    const newDateStr = prompt('Edit event date (YYYY-MM-DD):', currentDate);

    // Validate inputs and dispatch editEvent action if valid
    if (newDescription !== null && newDescription.trim() !== '' && newDateStr !== null) {
      const parsedDate = new Date(newDateStr);
      if (!isNaN(parsedDate.getTime())) {
        dispatch(editEvent({ index, newDescription, newDate: parsedDate }));
      } else {
        alert('Invalid date format. Please use YYYY-MM-DD.');
      }
    }
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (index: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(index));
    }
  };

  return (
    <div className="event-table-container">
      <div className="table-header">
        <h2>Event List</h2>
      </div>
      <div className="table-scroll">
        {events.length === 0 ? (
          <p className="no-events">No events found</p>
        ) : (
          <table className="event-table">
            <thead>
              <tr>
                <th className="description-header">Event Date</th>
                <th className="description-header">Description</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td className="description-cell">{event.date.toLocaleDateString()}</td>
                  <td className="description-cell">{event.description}</td>
                  <td className="actions-cell">
                    <button
                      className="edit-button"
                      onClick={() => handleEditEvent(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteEvent(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EventList;
