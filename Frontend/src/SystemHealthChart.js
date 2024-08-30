import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'CPU', Health: 80 },
  { name: 'Memory', Health: 70 },
  { name: 'Disk', Health: 90 },
  { name: 'Network', Health: 60 },
];

const SystemHealthChart = () => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Health" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);

export default SystemHealthChart;
