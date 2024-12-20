import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarioStudent.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


export default function CalendarioStudent() {
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
    <div className='containerCalendary'>
      <button onClick={() => setIsOpen(true)} className='calendaryButtonStudent'>
      {selectedDate.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' }).replace(',', ' de')}
      <div> </div>
      <CalendarTodayIcon style={{fontSize: 17}}/>
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