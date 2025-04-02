import React from 'react';
import { motion } from 'framer-motion';
import { deleteProduct } from '../Services/productService';


const ProductCard = ({id, productName, sku, price }) => {
    const handleDelete = async() =>{
        const res = await deleteProduct(id);
        window.location.reload();
    }
    return (
        <motion.div
            className="w-fit bg-white p-4 px-8 rounded-lg shadow-lg flex flex-col items-center"
        >
            <h2 className="text-lg font-semibold mb-2">{productName}</h2>
            <p className="text-md font-bold mb-4">Price: ${price}</p>
            <p className="text-sm text-gray-500 mb-2">Sku: {sku}</p>
            <button onClick={handleDelete} className='text-md text-white mb-2 bg-red-500 px-2 rounded-md py-1 hover:scale-110 transition-all'>Delete</button>
        </motion.div>
    );
};

export default ProductCard;
