import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Unauthorized Materials', value: 2 },
  { name: 'Suspicious Activities', value: 3 },
  { name: 'Suspicious Poses', value: 6 },
];

const COLORS = ['#0088FE', '#FFBB28','#420909'];

const RecentAlertsChart = () => (
  <PieChart width={250} height={250}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={50}
      outerRadius={80}
      fill="#8884d8"
      paddingAngle={5}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);

export default RecentAlertsChart;
