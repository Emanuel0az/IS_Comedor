import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, isSameDay, parseISO } from 'date-fns';
import './Panae.css'

export const Panae = () => {
  const [dailyIncome, setDailyIncome] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchDailyIncome = () => {
    const selectedDate = localStorage.getItem('selectedDate');
    if (!selectedDate) return;

    axios.get('http://localhost:8000/api/hist_pagos/')
      .then(response => {
        const pagosData = response.data;
        const incomeForSelectedDay = calculateIncomeForDay(pagosData, new Date(selectedDate));
        setDailyIncome(incomeForSelectedDay);
        setLastUpdate(new Date());
      })
      .catch(error => {
        console.error('Error al obtener los pagos:', error);
      });
  };

  const calculateIncomeForDay = (pagosData, selectedDate) => {
    return pagosData
      .filter(pago => isSameDay(parseISO(pago.fecha_pago_prueba), selectedDate))
      .reduce((sum, pago) => sum + parseFloat(pago.monto), 0);
  };

  useEffect(() => {
    fetchDailyIncome();

    const checkDayChange = () => {
      const now = new Date();
      if (!isSameDay(now, lastUpdate)) {
        fetchDailyIncome();
      }
    };

    const interval = setInterval(checkDayChange, 60000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  return (
    <div className='Panae_content_left'>
      <h2>Saldo Total del Día</h2>
      <p>₡{dailyIncome.toFixed(2)}</p>
    </div>
  );
};


