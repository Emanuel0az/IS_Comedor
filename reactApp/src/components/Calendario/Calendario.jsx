import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendario.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


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
    <div className='containerCalendary'>
      <button onClick={() => setIsOpen(true)} className='calendaryButton'>
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
                  <button style={{color: 'white'}} onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                    {"<"}
                  </button>
                  <button className='upperCase' style={{color: 'white'}} onClick={toggleMonthYearView}>
                    {date.toLocaleString('default', { month: 'long' })}
                  </button>
                  <button style={{color: 'white'}} onClick={toggleYearView}>{date.getFullYear()}</button>
                  <button style={{color: 'white'}} onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
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