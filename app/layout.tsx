'use client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <header>
            <h1>Event Scheduler</h1>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; 2024 Event Scheduler</p>
          </footer>
        </Provider>
      </body>
    </html>
  );
}
