import React, {useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { fetchLowStockItems } from '../Services/dashBoardService';

const ll = [
  { name: 'Product X', stock: 5 },
  { name: 'Product Y', stock: 8 },
  { name: 'Product Z', stock: 3 },
];

function LowStockCard() {
  
const COLORS = ['#4C9F70', '#FFC107', '#FF6F61']; 
const [lowStockData,setLowStockData] = useState([]);
const renderLabel = ({ name, percent }) => (
  `${(percent * 100).toFixed(0)}%`
);

useEffect(()=> {
  const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
  const fetch = async () => {
    const res = await fetchLowStockItems(franchise._id);
    const stock = res.data.stock.slice(0,3).map(item => ({
      name: item.product.productName, 
      stock: item.quantity 
  }));
  setLowStockData(stock);
  }
  fetch();
},[])

    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <h2 className="text-lg font-semibold mb-4">Low Stock Products</h2>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={lowStockData}
              dataKey="stock"
              cx="50%"
              cy="90%"
              outerRadius="120%"
              innerRadius="90%"
              startAngle={180}
              endAngle={0}
              labelLine={false}
              label={renderLabel}
            >
              {lowStockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="top" align="center" />
          </PieChart>
        </ResponsiveContainer>
        <button className="mt-4 bg-blue-600 outline-none text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          View More
        </button>
      </div>
    );
}

export default LowStockCard