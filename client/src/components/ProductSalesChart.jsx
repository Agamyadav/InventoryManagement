import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', productA: 30, productB: 45, productC: 28 },
  { name: 'Feb', productA: 50, productB: 55, productC: 35 },
  { name: 'Mar', productA: 70, productB: 60, productC: 40 },
  { name: 'Apr', productA: 85, productB: 65, productC: 45 },
  { name: 'May', productA: 90, productB: 70, productC: 50 },
  { name: 'Jun', productA: 100, productB: 75, productC: 55 },
  { name: 'Jul', productA: 110, productB: 80, productC: 60 },
];

const ProductSalesChart = () => {
  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4">Product Sales by Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="productA" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="productB" stroke="#82ca9d" dot={false} />
          <Line type="monotone" dataKey="productC" stroke="#ff7300" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        View Details
      </button>
    </motion.div>
  );
};

export default ProductSalesChart;
