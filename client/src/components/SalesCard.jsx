import React from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';

const SalesCard = ({ products, totalAmount, salesDate }) => {
    const generateBill = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Sales Bill', 14, 22);
        doc.setFontSize(12);
        doc.text(`Sale Date: ${new Date(salesDate).toLocaleDateString()}`, 14, 32);
        doc.setFontSize(12);
        doc.text('Products:', 14, 42);
        let y = 50; 
        products.forEach((product, index) => {
            doc.text(`${index + 1}. ${product.productId.productName}`, 14, y);
            doc.text(`   Quantity: ${product.quantity}`, 14, y + 6);
            doc.text(`   Total Amount: $${product.totalAmount.toFixed(2)}`, 14, y + 12);
            y += 18;
        });
        doc.setFontSize(14);
        doc.text(`Total Sale Amount: $${totalAmount.toFixed(2)}`, 14, y + 10);

        doc.save(`Sale_Bill_${new Date(salesDate).toLocaleDateString()}.pdf`);
    };
    return (
        <motion.div
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
            whileHover={{ scale: 1.05 }}
        >
            <h2 className="text-lg font-semibold mb-2">Sale Date: {salesDate}</h2>
            {products&&products.slice(0,2).map((product, index) => (
                <div key={index} className="mb-2">
                    <p className="text-sm font-medium">{product.productId.productName}</p> 
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    <p className="text-sm text-gray-500">Total Amount: ${product.totalAmount.toFixed(2)}</p>
                </div>
            ))}
            <p className="text-md font-bold mb-2">Total Sale Amount: ${totalAmount.toFixed(2)}</p>
            <button onClick={generateBill} className="px-4 py-2 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white">
                Generate Bill
            </button>
        </motion.div>
    );
};

export default SalesCard;
