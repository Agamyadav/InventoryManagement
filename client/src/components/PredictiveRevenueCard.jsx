import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
    { name: 'May', current: 2800, predicted: 3000 },
    { name: 'Jun', current: 3200, predicted:3100 },
    { name: 'Jul', current: 3500, predicted: 3300 },
    { name: 'Aug', current: 3600, predicted: 3400 },
    { name: 'Sep', current: 3700, predicted: 3500 },
    { name: 'Oct', current: 3900, predicted: 3600 },
    { name: 'Nov', current: 4000, predicted: 3700 },
    { name: 'Dec', current: 4200, predicted: 3800 },
];

const PredictiveRevenueCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Predictive Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#555' }} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#555' }} 
            tickLine={false} 
          />
          <Tooltip
            wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }}
          />
          <Line 
            type="monotone" 
            dataKey="current" 
            stroke="#8884d8" 
            dot={false} 
            strokeWidth={2} 
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#82ca9d" 
            dot={false} 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        View Details
      </button>
    </div>
  );
};

export default PredictiveRevenueCard;
