import React from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const OrderCard = ({ products, totalAmount, orderDate, status }) => {

    const generateInvoice = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Order Invoice', 14, 22);
        doc.setFontSize(12);
        doc.text(`Order Date: ${new Date(orderDate).toLocaleDateString()}`, 14, 32);
        doc.text(`Order Status: ${status}`, 14, 42);
        doc.text('Products:', 14, 52);
        let y = 60; 
        
        products.forEach((product, index) => {
            doc.text(`${index + 1}. ${product.productId.productName}`, 14, y);
            doc.text(`   Quantity: ${product.quantity}`, 14, y + 6);
            doc.text(`   Price: $${product.price.toFixed(2)}`, 14, y + 12);
            y += 18; 
        });
        doc.setFontSize(14);
        doc.text(`Total Order Amount: $${totalAmount.toFixed(2)}`, 14, y + 10);
        doc.save(`Order_Invoice_${new Date(orderDate).toLocaleDateString()}.pdf`);
    };

    return (
        <motion.div
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
            whileHover={{ scale: 1.05 }}
        >
            <h2 className="text-lg font-semibold mb-2">Order Date: {new Date(orderDate).toLocaleDateString()}</h2>
            <p className="text-md font-semibold mb-2">Status: {status}</p>
            {products.map((product, index) => (
                <div key={index} className="mb-2">
                    <p className="text-sm font-medium">{product.productId.productName}</p>
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    <p className="text-sm text-gray-500">Price: ${product.price.toFixed(2)}</p>
                </div>
            ))}

            <p className="text-md font-bold mb-2">Total Order Amount: ${totalAmount}</p>
            
            <button
                onClick={generateInvoice}
                className="px-4 py-2 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white"
            >
                Generate Invoice
            </button>
        </motion.div>
    );
};

export default OrderCard;
