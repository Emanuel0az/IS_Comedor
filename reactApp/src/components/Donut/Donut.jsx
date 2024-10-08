"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import '../Donut/Donut.css'


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

const stockMaximo = 1000;

const coloresPredefinidos = [
  'rgb(210,105,30)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

export default function DoughnutChart() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      actualizarGrafica();
    }
  }, [selectedIndex, productos]);

  const fetchProductos = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ingredientes/2/');
      if (!response.ok) {
        throw new Error('_');
      }
      const data = await response.json();
      const productoConColor = {
        ...data,
        color: data.color || coloresPredefinidos[0],
      };
      setProductos([productoConColor]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const actualizarGrafica = () => {
    let labels = [];
    let data = [];
    let colors = [];
    let borderColors = [];

    labels = productos.map(p => p.nombre);
    data = productos.map(p => p.cantidad);
    colors = productos.map(p => p.color);
    borderColors = productos.map(() => 'black');

    const totalOcupado = data.reduce((sum, cantidad) => sum + cantidad, 0);
    const disponible = Math.max(0, stockMaximo - totalOcupado);

    if (disponible > 0) {
      labels.push('Disponible');
      data.push(disponible);
      colors.push('rgb(200, 200, 200)');
      borderColors.push('black');
    }

    setChartData({
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2,
      }]
    });
  };

  const calcularPorcentajeTotal = () => {
    const totalOcupado = productos.reduce((sum, producto) => sum + producto.cantidad, 0);
    return ((totalOcupado / stockMaximo) * 100).toFixed(2);
  };

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      if (clickedIndex < productos.length) {
        setSelectedIndex(prevIndex => prevIndex === clickedIndex ? null : clickedIndex);
      } else {
        setSelectedIndex(null);
      }
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
        zIndex: 9999,
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
        text: selectedIndex !== null && selectedIndex < productos.length
          ? `${productos[selectedIndex].cantidad} / ${stockMaximo}\n${((productos[selectedIndex].cantidad / stockMaximo) * 100).toFixed(2)}%`
          : `${calcularPorcentajeTotal()}%`,
        color: 'white',
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
    <>
      <div className="containerDonut">
        <div className="containerTopDonut">
          <div className='donutLeft'>
            <div className='tittleDonut'>Nombre</div>
            <div className='imgDonut'>img</div>
          </div>
          <div className='donutRight'>
            <div className="div_donut">

              <div className="flex items-center justify-center mb-4" style={{ display: 'flex', alignItems: 'center', width: '10vw' }}>
                <div className="w-[80%] h-[80%]"> 
                  {chartData && <Doughnut data={chartData} options={chartOptions} />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='containerButtomDonut'>
          <div className="textoDonut">Aquí va el texto</div>
          <div className="estadoStock">Bajo</div>
        </div>
      </div>
    </>
  )
}