import React, { useState, useEffect } from 'react';
import { format, startOfWeek, isSameDay, addDays, differenceInCalendarDays } from 'date-fns';
import './GraficaStudents.css';
import StockComponent from '../Stock/StockComponent';
import { useIdContext } from '../UsinngContext';

export default function SessionsChartStudents() {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const {contextId} = useIdContext()
  

  const fetchData = () => {
    fetch('http://localhost:8000/api/hist_pagos/')
      .then(response => response.json())
      .then(asistenciaData => {
        const asistenciaCount = {};
        const today = new Date();
        const startOfThisWeek = startOfWeek(new Date(localStorage.getItem('selectedDate')), { weekStartsOn: 1 });
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        weekdays.forEach(day => {
          asistenciaCount[day] = 0;
        });

        const pagosEstudiante = asistenciaData.filter(item => item.estudiante_id === contextId);

        pagosEstudiante.forEach(item => {
          const asistenciaDate = new Date(item.fecha_pago_prueba);
          const asistenciaDatePlusOne = addDays(asistenciaDate, 1);

          if (differenceInCalendarDays(asistenciaDatePlusOne, startOfThisWeek) >= 0 &&
              differenceInCalendarDays(asistenciaDatePlusOne, startOfThisWeek) < 5) {
            const localDayOfWeek = format(asistenciaDatePlusOne, 'EEEE');

            if (asistenciaCount.hasOwnProperty(localDayOfWeek)) {
              asistenciaCount[localDayOfWeek] = 1; // Cambiado a 1 en lugar de incrementar
            }
          }
        });

        const processedData = weekdays.map(day => ({
          date: day,
          asistencia: asistenciaCount[day],
        }));

        setData(processedData);
        setLastUpdate(today);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();

    const checkDayChange = () => {
      const now = new Date();
      if (!isSameDay(now, lastUpdate)) {
        fetchData();
      }
    };

    const interval = setInterval(checkDayChange, 60000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className="sessions_charts">
      <div className="days-container">
        {data.map((day, index) => (
          <div key={index} className="day-item">
            <div className={`attendance-indicator ${day.asistencia ? 'attended' : 'absent'}`}></div>
            <span className="day-label">{day.date.slice(0, 3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}