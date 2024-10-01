import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../LineChart/LineChart.css';
const data = [
  { date: 'Apr 5', series1: 2000, series2: 1500, series3: 1000 },
  { date: 'Apr 10', series1: 8000, series2: 5000, series3: 3000 },
  { date: 'Apr 15', series1: 12000, series2: 8000, series3: 4000 },
  { date: 'Apr 20', series1: 15000, series2: 10000, series3: 5000 },
  { date: 'Apr 25', series1: 19000, series2: 13000, series3: 6000 },
  { date: 'Apr 30', series1: 22000, series2: 15000, series3: 7000 },
];
const SessionsChart = () => {
  return (
    <div className="sessions-chart">
      <h2>Sessions</h2>
      <div className="sessions-stats">
        <span className="sessions-number">13,277</span>
        <span className="sessions-percentage">+35%</span>
      </div>
      <p className="sessions-subtitle">Sessions per day for the last 30 days</p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSeries1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884D8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884D8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSeries2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82CA9D" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82CA9D" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSeries3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC658" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#FFC658" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{fill: '#8884D8'}} axisLine={false} tickLine={false} />
          <YAxis tick={{fill: '#8884D8'}} axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="series1" stroke="#8884D8" fillOpacity={1} fill="url(#colorSeries1)" />
          <Area type="monotone" dataKey="series2" stroke="#82CA9D" fillOpacity={1} fill="url(#colorSeries2)" />
          <Area type="monotone" dataKey="series3" stroke="#FFC658" fillOpacity={1} fill="url(#colorSeries3)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SessionsChart;