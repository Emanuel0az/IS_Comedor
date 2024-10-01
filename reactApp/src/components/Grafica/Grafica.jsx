import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfWeek, addDays } from 'date-fns';
import './Grafica.css';

const SessionsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/asistencias/')
      .then(response => response.json())
      .then(asistenciaData => {
        const asistenciaCount = {};
        const today = new Date();
        const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Lunes

        // Inicializar todos los días de la semana con 0
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        weekdays.forEach((day, index) => {
          asistenciaCount[day] = 0;
        });

        asistenciaData.forEach(item => {
          const dayOfWeek = format(new Date(item.fecha_asistencia), 'EEEE');
          if (asistenciaCount.hasOwnProperty(dayOfWeek)) {
            asistenciaCount[dayOfWeek] += 1;
          }
        });

        const processedData = weekdays.map(day => ({
          date: day,
          asistencia: asistenciaCount[day],
        }));

        setData(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="sessions-chart">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAsistencia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#002286" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0040ff" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="1 1" vertical={false}/>
          <XAxis dataKey="date" tick={{ fill: '#8884d8' }} axisLine={false} tickLine={false} interval={0}/>
          <YAxis tick={{ fill: '#8884d8' }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="asistencia" stroke="#8884d8" fillOpacity={1} fill="url(#colorAsistencia)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SessionsChart;