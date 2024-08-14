"use client"
import React from 'react';
import Calendar from './components/Calendar';
import EventList from './components/EventList';

const Page: React.FC = () => {
  return (
    <div>
      <Calendar />
      <EventList />
    </div>
  );
};

export default Page;
