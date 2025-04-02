import React,{useState,useEffect} from 'react'
import { motion } from 'framer-motion';
import StockCard from '../components/StockCard';
import { getFranchiseStock } from '../Services/stockService';
function StockPage({inventoryId}) {
const [inventories,setInventories] = useState([]);
  
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
                  {inventories&&inventories.map((inventory) => (
                <div key={inventory._id} className="mb-6 border p-4 rounded-md shadow-md bg-white flex flex-col justify-center gap-3">
                    <h3 className="text-lg font-semibold mb-8 text-center">{inventory.inventoryName}</h3>
                    <button onClick={()=>(window.location.href = `/#stocks/${inventory._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        Manage Inventory
                    </button>
                    <button onClick={()=>(handleDelete(inventory._id))} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                        Delete
                    </button>
                </div>
                ))}
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