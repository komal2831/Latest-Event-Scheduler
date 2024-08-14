"use client"
import React from 'react';
import Calendar from './components/Calendar';
import EventList from './components/EventList';
import './styles/globals.css';

const Page: React.FC = () => {
  return (
    <div className="calendar-event-container">
    <div className="calendar">
      <Calendar />
    </div>
    <div className="event-list">
      <EventList />
    </div>
  </div>
  );
};

export default Page;
