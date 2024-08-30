import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '10:00', Activity: 40 },
  { name: '10:30', Activity: 30 },
  { name: '11:00', Activity: 50 },
  { name: '11:30', Activity: 80 },
  { name: '12:00', Activity: 90 },
];

const LiveStatisticsChart = () => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Activity" stroke="#8884d8" />
    </LineChart>
  </ResponsiveContainer>
);

export default LiveStatisticsChart;
