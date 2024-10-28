import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, isSameDay, addDays, differenceInCalendarDays } from 'date-fns';
import './GraficaStudents.css';

const SessionsChartStudents = () => {
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date()); // Última fecha de actualización

  const fetchData = () => {
    fetch('http://localhost:8000/api/hist_pagos/')
      .then(response => response.json())
      .then(asistenciaData => {
        const asistenciaCount = {};
        const today = new Date();
        const startOfThisWeek = startOfWeek(new Date(localStorage.getItem('selectedDate')), { weekStartsOn: 1 }); // Lunes de esta semana
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        // Inicializa la cuenta de asistencia para cada día de la semana
        weekdays.forEach(day => {
          asistenciaCount[day] = 0;
        });

        // Filtrar solo los pagos del estudiante con ID 1 (puedes hacer esto dinámico si lo necesitas)
        const pagosEstudiante = asistenciaData.filter(item => item.estudiante_id === 1);

        // Iterar sobre los pagos filtrados y contar por día
        pagosEstudiante.forEach(item => {
          const asistenciaDate = new Date(item.fecha_pago_prueba);  
          const asistenciaDatePlusOne = addDays(asistenciaDate, 1);  // Si necesitas sumar un día

          // Verifica si la fecha pertenece a la semana actual
          if (differenceInCalendarDays(asistenciaDatePlusOne, startOfThisWeek) >= 0 &&
              differenceInCalendarDays(asistenciaDatePlusOne, startOfThisWeek) < 5) {
            const localDayOfWeek = format(asistenciaDatePlusOne, 'EEEE');

            if (asistenciaCount.hasOwnProperty(localDayOfWeek)) {
              asistenciaCount[localDayOfWeek] += 1;
            }
          }
        });

        // Formatea los datos para el gráfico
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
      if (!isSameDay(now, lastUpdate)) {
        fetchData(); // Si ha cambiado el día, vuelve a obtener los datos
      }
    };

    const interval = setInterval(checkDayChange, 60000); // Verificar cada minuto si el día cambió

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [lastUpdate]);

  return (
    <div className="sessions-chart">
      <ResponsiveContainer width="100%" height={171}>
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

export default SessionsChartStudents;
