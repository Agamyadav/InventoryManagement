import React, { useState,useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { fetchHighestSellingProducts } from '../Services/dashBoardService';



function HighestSellingCard() {

const COLORS = ['#FFC107','#4C9F70', '#FF6F61']; 
const [highestSellingData,setHighestSellingData] = useState([]);
const renderLabel = ({ name, percent }) => (
  `${(percent ).toFixed(0)} unit`
);

useEffect(()=> {
  const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
  const fetch = async () => {
    const res = await fetchHighestSellingProducts(franchise._id);
    console.log(res.products);
    const stock = res.products.slice(0, 3).map(item => {

      return {
          name: item.product.productName, 
          sales: item.quantity,
          percent: item.quantity
      };
  });
  setHighestSellingData(stock);
  }
  fetch();
},[])


  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Highest Selling Products</h2>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={highestSellingData}
            dataKey="sales"
            cx="50%"
            cy="90%"
            outerRadius="120%"
            innerRadius="90%"
            startAngle={180}
            endAngle={0}
            labelLine={false}
            label={renderLabel}
          >
            {highestSellingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="top" align='center' />
        </PieChart>
      </ResponsiveContainer>
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
        View More
      </button>
    </div>
  );
}

export default HighestSellingCard