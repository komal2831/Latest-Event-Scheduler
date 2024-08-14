// utils/storage.ts

// Define an interface for events that will be stored in local storage
interface EventStorage {
  description: string;
  date: string; // Store dates as ISO strings
}

// Function to load events from local storage
export const loadEvents = (): { description: string; date: Date }[] => {
  const savedEvents = localStorage.getItem('events');
  
  if (savedEvents) {
    try {
      const parsedEvents = JSON.parse(savedEvents) as EventStorage[];
      
      // Convert date strings back to Date objects
      return parsedEvents.map(event => ({
        ...event,
        date: new Date(event.date) // Convert date string to Date object
      }));
    } catch (error) {
      console.error('Error parsing saved events:', error);
      return [];
    }
  }
  
  return [];
};

// Function to save events to local storage
export const saveEvents = (events: { description: string; date: Date }[]) => {
  // Ensure that all events have a valid date
  const eventsToStore = events.map(event => {
    if (event.date instanceof Date && !isNaN(event.date.getTime())) {
      return {
        description: event.description,
        date: event.date.toISOString() // Convert Date object to ISO string
      };
    } else {
      console.error('Invalid event date:', event.date);
      return null;
    }
  }).filter(event => event !== null); // Filter out invalid events
  
  localStorage.setItem('events', JSON.stringify(eventsToStore));
};
