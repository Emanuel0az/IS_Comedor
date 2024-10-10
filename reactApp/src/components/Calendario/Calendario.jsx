import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendario.css';
import { postAsistencia } from '../../server/Asistencia/PostAsistencia';

export default function CalendarioModal() {
  const [fechaLocaltorage, setFechaLocaltorage] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem('selectedDate') ? new Date(localStorage.getItem('selectedDate')) : new Date()
  );
  const [showMonthYear, setShowMonthYear] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem('selectedDate', date.toISOString());
    setShowMonthYear(false);
    setShowYear(false);
  };

  const toggleMonthYearView = () => {
    setShowMonthYear(!showMonthYear);
    setShowYear(false);
  };

  const toggleYearView = () => {
    setShowYear(!showYear);
    setShowMonthYear(false);
  };

  return (
    <div className='container'>
      <button onClick={() => setIsOpen(true)} className='button'>
      {selectedDate.toISOString().split('T')[0]}
      </button>
      {isOpen && (
        <div className='modalOverlay' onClick={() => setIsOpen(false)}>
          <div className='modalContent' onClick={(e) => e.stopPropagation()}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              showMonthYearPicker={showMonthYear}
              showYearPicker={showYear}
              showPopperArrow={false}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                decreaseYear,
                increaseYear,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className='customHeader'>
                  <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <button onClick={toggleMonthYearView}>
                    {date.toLocaleString('default', { month: 'long' })}
                  </button>
                  <button onClick={toggleYearView}>{date.getFullYear()}</button>
                  <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}