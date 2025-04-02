import React from 'react';
import ProductSalesChart from '../components/ProductSalesChart';
import TopProductsCard from '../components/TopProductsCard';
import LowStockCard from '../components/LowStockCard';
import HighestSellingCard from '../components/HighestSellingCard';
import PredictiveRevenueCard from '../components/PredictiveRevenueCard';
const Dashboard = () => {
  
  return (
    
    <div className=" p-6 backdrop-blur-lg relative h-screen overflow-scroll rounded-xl border-2 border-gray-300">
      <h1 className="text-3xl font-medium mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1 md:col-span-2">
          <PredictiveRevenueCard />
        </div>

        <div className="col-span-1 md:col-span-1">
          <LowStockCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-1">
          <HighestSellingCard />
        </div>
        <div className="col-span-1 md:col-span-2">
          <TopProductsCard />
        </div>

      </div>

      <div className="mt-6">
        <ProductSalesChart />
      </div>
    </div>
  );
};

export default Dashboard;
