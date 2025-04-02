import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SalesCard from '../components/SalesCard';
import AddSale from '../components/AddSale';
import { createSale,fetchSalesForFranchise } from '../Services/salesService';



const Sales = () => {
    const [sales, setSales] = useState([]);
    const [showAddSale, setShowAddSale] = useState(false);

    const handleAddSale = async(newSale,saleAmount,saleDate) => {
        const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
        const res = await createSale(franchise._id,newSale,saleAmount,saleDate);
        setShowAddSale(false); 
    };
    useEffect (()=>{
        const fetch = async() => {
            const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
            const res = await fetchSalesForFranchise(franchise._id);
            console.log(res.sales);
            setSales(res.sales);
        }
        fetch();
    },[])

    

    return (
        <div className="p-6  h-screen overflow-scroll rounded-xl border-2 border-gray-200 relative">
            <motion.h1
                className="text-2xl font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Sales Management
            </motion.h1>
            <div className="mb-6">
                <button
                    onClick={() => setShowAddSale(!showAddSale)}
                    className={`px-4 py-2  ${showAddSale?'bg-red-400 hover:bg-red-500':'bg-green-500 hover:bg-green-600'} text-white rounded-md `}
                >
                    {showAddSale ? 'Cancel' : 'Add New Sale'}
                </button>
            </div>
            {showAddSale && <AddSale onAddSale={handleAddSale} />}
            {!showAddSale&&<motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delayChildren: 0.3,
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                {sales&&sales.map((sale) => (
                    <motion.div key={sale.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <SalesCard
                            products={sale.salesItems} 
                            totalAmount={sale.salesAmount}
                            salesDate={sale.salesDate}
                        />
                    </motion.div>
                ))}
            </motion.div>}
        </div>
    );
};

export default Sales;
