import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date | Date[] | null) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  // Handle the change event
  const handleDateChange = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      onDateChange(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* To load Calandar */}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="calendar"
      />
    </motion.div>
  );
};

export default CalendarComponent;
