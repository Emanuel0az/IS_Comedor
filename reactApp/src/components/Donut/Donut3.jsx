import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { format, startOfWeek, isSameDay, addDays, differenceInCalendarDays } from 'date-fns';
import './Donut.css'

const CenterTextPlugin = {
  id: 'centerText',
  afterDraw(chart, args, options) {
    const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;

    ctx.save();
    if (options.text) {
      const text = options.text;
      const textX = left + width / 2;
      const textY = top + height / 2;

      ctx.beginPath();
      ctx.arc(textX, textY, Math.min(width, height) / 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fill();

      ctx.font = options.font || '16px Arial';
      ctx.fillStyle = options.color || 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const lines = text.split('\n');
      const lineHeight = 20;
      lines.forEach((line, index) => {
        const yOffset = (index - (lines.length - 1) / 2) * lineHeight;
        ctx.fillText(line, textX, textY + yOffset);
      });
    }
    ctx.restore();
  }
};

ChartJS.register(ArcElement, Tooltip, Legend, Title);
ChartJS.register(CenterTextPlugin);

const totalEstudiantes = 966;

const coloresPredefinidos = [
  'gray', // Azul
  '#1b1a66'  // Rosa
];

export default function EstudiantesComedorChartMiercoles() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [estudiantes, setEstudiantes] = useState({
    comieron: 0,
    noComieron: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEstudiantes = () => {
    fetch('http://localhost:8000/api/hist_pagos/')
      .then(response => response.json())
      .then(data => {
        const selectedDate = new Date(localStorage.getItem('selectedDate') || new Date());
        const mondayOfSelectedWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const wednesdayOfSelectedWeek = addDays(mondayOfSelectedWeek, 2);
        
        // console.log('Selected Date:', selectedDate);
        // console.log('Wednesday of Selected Week:', wednesdayOfSelectedWeek);
  
        // Filtra los estudiantes becados y no becados
        const estudiantesBecadosComieronMiercoles = data.filter(item => {
          const fechaPago = addDays(new Date(item.fecha_pago_prueba), 1); // Ajuste de la fecha de pago
        //   console.log('Fecha de pago:', fechaPago);
        //   console.log('¿Es el mismo día que el miércoles?', isSameDay(fechaPago, wednesdayOfSelectedWeek));
          return isSameDay(fechaPago, wednesdayOfSelectedWeek) && item.monto === 0; // Verifica si la fecha coincide y el monto es 0
        }).length;
  
        const estudiantesNoBecadosComieronMiercoles = data.filter(item => {
          const fechaPago = addDays(new Date(item.fecha_pago_prueba), 1); // Ajuste de la fecha de pago
          return isSameDay(fechaPago, wednesdayOfSelectedWeek) && item.monto !== 0; // Verifica si la fecha coincide y el monto es diferente de 0
        }).length;
  
        const totalComieronMiercoles = estudiantesBecadosComieronMiercoles + estudiantesNoBecadosComieronMiercoles;
        const estudiantesNoComieronMiercoles = totalEstudiantes - totalComieronMiercoles;
  
        // console.log('Estudiantes becados que comieron el miércoles:', estudiantesBecadosComieronMiercoles);
        // console.log('Estudiantes no becados que comieron el miércoles:', estudiantesNoBecadosComieronMiercoles);
        // console.log('Total de estudiantes que comieron el miércoles:', totalComieronMiercoles);
        // console.log('Estudiantes que no comieron el miércoles:', estudiantesNoComieronMiercoles);

        setEstudiantes({
          comieron: totalComieronMiercoles,
          noComieron: estudiantesNoComieronMiercoles
        });
  
        setLastUpdate(wednesdayOfSelectedWeek);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setIsLoading(false);
      });
  };
  
  // UseEffect para que el gráfico cambie cada vez que cambia la fecha seleccionada
  useEffect(() => {
    fetchEstudiantes();
  }, [localStorage.getItem('selectedDate')]);

  useEffect(() => {
    fetchEstudiantes(); // Cargar los datos inicialmente

    const checkDayChange = () => {
      const now = new Date();
      // Verifica si ha cambiado el día comparando la fecha actual con la última fecha de actualización
      if (!isSameDay(now, lastUpdate)) {
        fetchEstudiantes(); // Si el día cambió, vuelve a obtener los datos
      }
    };

    const interval = setInterval(checkDayChange, 60000); // Verifica cada minuto si ha cambiado el día

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [lastUpdate]);

  useEffect(() => {
    if (estudiantes.comieron !== 0 || estudiantes.noComieron !== 0) {
      const labels = ['Comieron', 'No Comieron'];
      const data = [estudiantes.comieron, estudiantes.noComieron];
      const colors = coloresPredefinidos;
      const borderColors = ['black', 'black'];

      setChartData({
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: borderColors,
          borderWidth: 0.5,
        }]
      });
    }
  }, [estudiantes]);

  const calcularPorcentajeComieron = () => {
    return ((estudiantes.comieron / totalEstudiantes) * 100).toFixed(2);
  };

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      setSelectedIndex(prevIndex => prevIndex === clickedIndex ? null : clickedIndex);
    } else {
      setSelectedIndex(null);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
          },
      tooltip: {
        enabled: true,
        position: 'nearest',
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        padding: 10,
        cornerRadius: 5,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          }
        },
      },
      title: {
        display: false,
      },
      centerText: {
        text: selectedIndex !== null
          ? `${estudiantes[selectedIndex === 0 ? 'comieron' : 'noComieron']} / ${totalEstudiantes}\n${((estudiantes[selectedIndex === 0 ? 'comieron' : 'noComieron'] / totalEstudiantes) * 100).toFixed(2)}%`
          : `${calcularPorcentajeComieron()}%`,
        color: 'black',
        font: '12px Arial',
      },
    },
    onClick: handleClick,
  };

  if (isLoading) {
    return <div className="text-center">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="Title_donut">Miercoles
      <div className="flex items-center justify-center mb-4" style={{ width: '110px', height: '110px' }}>
        <div className="w-[200px] h-[200px] relative">
          {chartData && <Doughnut data={chartData} options={chartOptions} />}
        </div>
      </div>
    </div>
  )
}