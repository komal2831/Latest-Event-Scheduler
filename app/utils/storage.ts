// app/utils/storage.ts
export const loadEvents = (): { date: Date; description: string }[] => {
    const data = localStorage.getItem('events');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveEvents = (events: { date: Date; description: string }[]) => {
    localStorage.setItem('events', JSON.stringify(events));
  };
  