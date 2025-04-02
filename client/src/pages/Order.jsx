import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderCard from '../components/OrderCard';
import AddOrder from '../components/AddOrder';
import { createOrder, fetchOrders } from '../Services/orderService';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [showAddOrder, setShowAddOrder] = useState(false);

    const handleAddOrder = async (orderItems, orderDate,orderAmount) => {
        const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
        const res = await createOrder(franchise._id, orderItems,orderDate,orderAmount);
        setShowAddOrder(false); 
    };

    const fetchOrder = async() => {
        const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
        const res = await fetchOrders(franchise._id);
        setOrders(res);
    };

    useEffect(() => {
        fetchOrder(); 
    }, []);

    return (
        <div className="p-6 h-screen overflow-scroll rounded-xl border-2 border-gray-200 relative">
            <motion.h1
                className="text-2xl font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Orders Management
            </motion.h1>
            <div className="mb-6">
                <button
                    onClick={() => setShowAddOrder(!showAddOrder)}
                    className={`px-4 py-2 ${showAddOrder ? 'bg-red-400 hover:bg-red-500' : 'bg-green-500 hover:bg-green-600'} text-white rounded-md`}
                >
                    {showAddOrder ? 'Cancel' : 'Add New Order'}
                </button>
            </div>
            {showAddOrder && <AddOrder onAddOrder={handleAddOrder} />}
            {!showAddOrder && (
                <motion.div
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
                    {orders&&orders.map((order) => (
                        <motion.div key={order._id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                           <OrderCard
                                products={order.orderItems}
                                totalAmount={order.orderAmount}
                                orderDate={order.orderDate}
                                status={order.orderStatus}
                            />

                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Orders;
