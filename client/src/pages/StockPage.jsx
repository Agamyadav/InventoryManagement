import React,{useState,useEffect} from 'react'
import { motion } from 'framer-motion';
import StockCard from '../components/StockCard';
import { getFranchiseStock } from '../Services/stockService';
function StockPage({inventoryId}) {

    const [stocks,setStock] = useState([]);
    const franchise = JSON.parse(localStorage.getItem('selectedFranchise'));
    useEffect(()=>{
        const fetchStock = async() => {
            const res = await getFranchiseStock(franchise._id, inventoryId);
            setStock(res.data);
        }
        fetchStock();
    },[inventoryId])

    return (
        <div className="p-6  h-screen overflow-scroll rounded-xl ">
            <motion.h1
                className="text-2xl font-medium mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Stock Management
            </motion.h1>
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
                {stocks&&stocks.map((stock) => (
                    <motion.div key={stock._id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <StockCard
                            franchiseId={stock.franchiseId}
                            productId={stock.productId._id}
                            name={stock.productId.productName}
                            availableStock={stock.quantity}
                            maxStock={stock.productId.sku}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default StockPage