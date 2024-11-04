import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, isSameDay, addDays, differenceInCalendarDays } from 'date-fns';
import './Grafica.css';

const SessionsChart = () => {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date()); // Última fecha de actualización

  const fetchData = () => {
    fetch('http://localhost:8000/api/hist_pagos/')
      .then(response => response.json())
      .then(asistenciaData => {
        // Filtrar solo los pagos activos
        const pagosActivos = asistenciaData.filter(pago => pago.activo === true);
  
        const asistenciaCount = {};
        const today = new Date();
        const startOfThisWeek = startOfWeek(new Date(localStorage.getItem('selectedDate')), { weekStartsOn: 1 });
  
        // Inicializar todos los días de la semana con 0
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        weekdays.forEach((day) => {
          asistenciaCount[day] = 0;
        });
  
        pagosActivos.forEach(item => {
          const asistenciaDate = new Date(item.fecha_pago_prueba);
          const asistenciaDatePlusOne = addDays(asistenciaDate, 1);
  
          // Verificar si la fecha de asistencia pertenece a esta semana
          if (differenceInCalendarDays(asistenciaDatePlusOne, startOfThisWeek) >= 0 &&
              differenceInCalendarDays(asistenciaDatePlusOne, startOfThisWeek) < 5) {
            const localDayOfWeek = format(asistenciaDatePlusOne, 'EEEE'); 
  
            if (asistenciaCount.hasOwnProperty(localDayOfWeek)) {
              asistenciaCount[localDayOfWeek] += 1;
            }
          }
        });
  
        const processedData = weekdays.map(day => ({
          date: day,
          asistencia: asistenciaCount[day],
        }));
  
        setData(processedData);
        setLastUpdate(today); // Actualiza la última fecha de actualización
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData(); // Cargar los datos inicialmente

    const checkDayChange = () => {
      const now = new Date();
      // Verifica si ha cambiado el día comparando la fecha actual con la última fecha de actualización
      if (!isSameDay(now, lastUpdate)) {
        fetchData(); // Si el día cambió, vuelve a obtener los datos
      }
    };

    const interval = setInterval(checkDayChange, 60000); // Verifica cada minuto si ha cambiado el día

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [lastUpdate]);

  return (
    <div className="sessions-chart">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAsistencia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#002286" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0040ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="1 1" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#8884d8' }} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{ fill: '#8884d8' }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="asistencia" stroke="#8884d8" fillOpacity={1} fill="url(#colorAsistencia)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionsChart