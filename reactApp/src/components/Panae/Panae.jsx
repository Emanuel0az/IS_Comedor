import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, isSameDay, parseISO } from 'date-fns';
import './Panae.css';

export const Panae = () => {
  const [dailyIncome, setDailyIncome] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [hasAccess, setHasAccess] = useState(false);

  // Función para obtener el valor de una cookie por su nombre
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Verificar la cookie al montar el componente
  useEffect(() => {
    const token2 = getCookie('token2');
    setHasAccess(!!token2);
  }, []);

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
    if (hasAccess) {
      fetchDailyIncome();

      const checkDayChange = () => {
        const now = new Date();
        if (!isSameDay(now, lastUpdate)) {
          fetchDailyIncome();
        }
      };

      const interval = setInterval(checkDayChange, 60000);
      return () => clearInterval(interval);
    }
  }, [lastUpdate, hasAccess]);

  // Si no tiene acceso, no renderizar nada
  if (!hasAccess) {
    return null;
  }

  return (
    <div className='Panae_content_left'>
      <h2>Saldo Total del Día</h2>
      <p>₡{dailyIncome.toFixed(2)}</p>
    </div>
  );
};