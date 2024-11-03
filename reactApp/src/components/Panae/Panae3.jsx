import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isSameMonth, parseISO } from 'date-fns';
import './Panae.css'


export const Panae3 = () => {
  const [totalPagos, setTotalPagos] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchTotalPagos = () => {
    axios.get('http://localhost:8000/api/hist_pagos/')
      .then(response => {
        const pagosData = response.data;
        const total = calculateMonthlyTotal(pagosData);
        setTotalPagos(total);
        setLastUpdate(new Date());
      })
      .catch(error => {
        console.error('Error al obtener los pagos:', error);
      });
  };

  const calculateMonthlyTotal = (pagosData) => {
    const selectedDate = new Date(localStorage.getItem('selectedDate'));

    return pagosData
      .filter(pago => {
        const paymentDate = parseISO(pago.fecha_pago_prueba);
        return isSameMonth(paymentDate, selectedDate);
      })
      .reduce((sum, pago) => sum + parseFloat(pago.monto), 0);
  };

  useEffect(() => {
    fetchTotalPagos();

    const checkDayChange = () => {
      const now = new Date();
      if (!isSameDay(now, lastUpdate)) {
        fetchTotalPagos();
      }
    };

    const interval = setInterval(checkDayChange, 60000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className='Panae_content_right'>
      <h2>Saldo de este Mes</h2>
      <p>₡{totalPagos.toFixed(2)}</p>
    </div>
  );
};
