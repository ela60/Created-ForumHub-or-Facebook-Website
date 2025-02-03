import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ posts, comments, users }) => {
  const data = [
    { name: 'Posts', value: posts },
    { name: 'Comments', value: comments },
    { name: 'Users', value: users },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Site Activity Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
