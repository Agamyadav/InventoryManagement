import React, { useState } from 'react';

const AddProduct = ({ onAddProduct ,close}) => {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            productName:name,
            sku,
            price: parseFloat(price),
        };

        onAddProduct(newProduct);

        setName('');
        setSku('');
        setPrice('');
    };

    return (
        <div className='w-full h-full absolute top-0 left-0 backdrop-blur-md flex items-center justify-center'>
            <div className="p-6 bg-white rounded-lg shadow-lg w-1/2 h-11/12">
                <div className='w-full flex items-center justify-between'>
                <h2 className="text-2xl font-medium mb-4">Add New Product</h2>
                <button onClick={() => close(false)} className=" py-1 px-4 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-transform duration-500 ease-in-out">Cancel</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Sku</label>
                        <input
                            type='number'
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md  resize-none"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    >
                        Add Product
                    </button>
                </form>
            </div>      
        </div>
    );
};

export default AddProduct;
