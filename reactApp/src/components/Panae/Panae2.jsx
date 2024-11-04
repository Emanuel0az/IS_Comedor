import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { startOfWeek, differenceInCalendarDays, addDays, format, isSameDay } from 'date-fns';
import Cookies from 'js-cookie';
import './Panae.css';

export const Panae2 = () => {
  const [totalPagos, setTotalPagos] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Check for token2 cookie on component mount
    const token2 = Cookies.get('token2');
    setHasAccess(!!token2);
  }, []);

  const fetchTotalPagos = () => {
    axios.get('http://localhost:8000/api/hist_pagos/')
      .then(response => {
        const pagosData = response.data;
        const total = calculateWeeklyTotal(pagosData);
        setTotalPagos(total);
        setLastUpdate(new Date());
      })
      .catch(error => {
        console.error('Error al obtener los pagos:', error);
      });
  };

  const calculateWeeklyTotal = (pagosData) => {
    const selectedDate = new Date(localStorage.getItem('selectedDate'));
    const startOfThisWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const endOfThisWeek = addDays(startOfThisWeek, 4);

    return pagosData
      .filter(pago => {
        const paymentDate = new Date(pago.fecha_pago_prueba);
        return (
          differenceInCalendarDays(paymentDate, startOfThisWeek) >= 0 &&
          differenceInCalendarDays(paymentDate, endOfThisWeek) <= 0
        );
      })
      .reduce((sum, pago) => sum + parseFloat(pago.monto), 0);
  };

  useEffect(() => {
    if (hasAccess) {
      fetchTotalPagos();

      const checkDayChange = () => {
        const now = new Date();
        if (!isSameDay(now, lastUpdate)) {
          fetchTotalPagos();
        }
      };

      const interval = setInterval(checkDayChange, 60000);

      return () => clearInterval(interval);
    }
  }, [lastUpdate, hasAccess]);

  // If no access, return null or an unauthorized message
  if (!hasAccess) {
    return null; // Or return an unauthorized message if preferred
  }

  return (
    <div className='Panae_content_center'>
      <h2>Saldo de esta semana</h2>
      <p>₡{totalPagos.toFixed(2)}</p>
    </div>
  );
};

export default Panae2;