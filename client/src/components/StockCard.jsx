import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { updateProductStock } from '../Services/stockService';

const StockCard = ({franchiseId, productId, name, availableStock, maxStock }) => {
    const [stock, setStock] = useState(availableStock);
    const [addQuantity, setAddQuantity] = useState(0);

    const handleAddStock = async() => {
        if(parseInt(stock)+parseInt(addQuantity) > parseInt(maxStock)){
            setAddQuantity(0);
            return;
        }
        const res = await updateProductStock(franchiseId,productId,parseInt(stock)+parseInt(addQuantity));
        setAddQuantity(0);
        window.location.reload();
    };

    return (
        <motion.div
            className={`p-4 rounded-lg shadow-lg flex flex-col items-center ${stock === 0 ? 'bg-red-100 border border-red-400' : 'bg-white'}`}
            whileHover={{ scale: 1.05 }}
        >
            <h2 className="text-lg font-semibold mb-2">{name}</h2>
            <p className="text-sm text-gray-500 mb-2">
                {stock === 0 ? (
                    <span className="text-red-500">Out of Stock</span>
                ) : (
                    `Available Stock: ${stock}/${maxStock}`
                )}
            </p>
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="number"
                    value={addQuantity}
                    onChange={(e) => setAddQuantity(e.target.value)}
                    className="w-20 p-2 border border-gray-300 rounded-md text-center"
                    
                />
                <button
                    onClick={handleAddStock}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    
                >
                    Add Stock
                </button>
            </div>
        </motion.div>
    );
};

export default StockCard;
