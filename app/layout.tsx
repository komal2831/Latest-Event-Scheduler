"use client"
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <html>
        <body>
        <div>
        <header>
          <h1>Event Scheduler</h1>
        </header>
        <main>
          {children}
        </main>
      </div>
        </body>
      </html>
      
    </Provider>
  );
};

export default Layout;
