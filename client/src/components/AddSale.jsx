import React, { useState, useEffect } from 'react';
import { fetchFranchiseStock } from '../Services/franchiseService';

const AddSale = ({ onAddSale }) => {
    const [products, setProducts] = useState([{ product: null, quantity: '', totalAmount: '' }]);
    const [saleDate, setSaleDate] = useState('');
    const [availableStock, setAvailableStock] = useState([]);

    const handleProductChange = (index, e) => {
        const selectedProduct = JSON.parse(e.target.value); 
        const newProducts = [...products];
        newProducts[index].product = selectedProduct; 
        newProducts[index].quantity = ''; 
        newProducts[index].totalAmount = ''; 
        setProducts(newProducts);
    };

    const handleQuantityChange = (index, e) => {
        const { value } = e.target;
        const newProducts = [...products];
        const quantity = parseInt(value, 10);
        console.log(value)
        if (newProducts[index].product && quantity <= newProducts[index].product.quantity) {
            newProducts[index].quantity = value;
            newProducts[index].totalAmount = (newProducts[index].product.productId.price * quantity); 
        } else {
            newProducts[index].quantity = '';
            newProducts[index].totalAmount = '';
        }

        setProducts(newProducts);
    };

    useEffect(() => {
        const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
        const fetch = async () => {
            const res = await fetchFranchiseStock(franchise._id);
            setAvailableStock(res);
        };
        fetch();
    }, []);

    const handleAddProduct = () => {
        setProducts([...products, { product: null, quantity: '', totalAmount: '' }]);
    };

    const handleRemoveProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProducts = products.map((product) => ({
            productId: product.product.productId._id, 
            quantity: product.quantity,
            totalAmount: product.totalAmount,
        }));

        const totalAmount = updatedProducts.reduce((sum, product) => sum + parseFloat(product.totalAmount || 0), 0);

        

        onAddSale(updatedProducts,totalAmount,saleDate);
        setProducts([{ productId: '', quantity: '', totalAmount: '' }]);
        setSaleDate('');
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Sale</h2>
            <form onSubmit={handleSubmit}>
                {products.map((product, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Product {index + 1}</h3>
                        <div className="mb-2">
                            <label className="block text-gray-700">Product</label>
                            <select
                                name="productId"
                                value={product.product ? JSON.stringify(product.product) : ''}
                                onChange={(e) => handleProductChange(index, e)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Select a product</option>
                                {availableStock.map((item) => (
                                    <option key={item._id} value={JSON.stringify(item)}>
                                        {item.productId.productName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(index, e)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Total Amount</label>
                            <input
                                type="number"
                                step="0.01"
                                name="totalAmount"
                                value={product.totalAmount}
                                readOnly 
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {products.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveProduct(index)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Remove Product
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddProduct}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
                >
                    Add Another Product
                </button>
                <div className="mb-4">
                    <label className="block text-gray-700">Sale Date</label>
                    <input
                        type="date"
                        value={saleDate}
                        onChange={(e) => setSaleDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add Sale
                </button>
            </form>
        </div>
    );
};

export default AddSale;
