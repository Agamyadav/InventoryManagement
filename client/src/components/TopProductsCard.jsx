import React,{useState,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchLowStockItems } from '../Services/dashBoardService';

const topProductsData = [
  { name: 'Product A', quantity: 100 },
  { name: 'Product B', quantity: 80 },
  { name: 'Product C', quantity: 60 },
];

function TopProductsCard() {
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const [topProductsData,setTopProductsData] = useState([]);
const CustomTooltip = ({ payload, label }) => {
  if (payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 p-2 rounded shadow-lg">
        <p className="text-gray-700 font-bold">{label}</p>
        <p className="text-gray-600">{`Quantity: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

useEffect(()=> {
  const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
  const fetch = async () => {
    const res = await fetchLowStockItems(franchise._id);
    const stockData = res.data.stock.reverse();
    const stock = stockData.slice(0,3).map(item => ({
      name: item.product.productName, 
      quantity: item.quantity 
  }));
  setTopProductsData(stock);
  }
  fetch();
},[])


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Top 3 Products by Stock</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={topProductsData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 14, fill: '#555' }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 14, fill: '#555' }} 
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="quantity"
            radius={[8, 8, 0, 0]}  // Rounded corners for bars
            padding={5}  // Padding around bars
          >
            {topProductsData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#color${index})`}
              />
            ))}
          </Bar>
          <defs>
            {topProductsData.map((entry, index) => (
              <linearGradient id={`color${index}`} key={index} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="5%" stopColor={COLORS[index]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLORS[index]} stopOpacity={0.3} />
              </linearGradient>
            ))}
          </defs>
        </BarChart>
      </ResponsiveContainer>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        View More
      </button>
    </div>
  );
}

export default TopProductsCard;
