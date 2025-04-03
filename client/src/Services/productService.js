import axios from 'axios';

const API_URL = 'https://inventorymanagement-3isj.onrender.com/api/product';

const createProduct = async (productData) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await axios.post(
            API_URL,
            productData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json',  
                },
            }
        );
        return response.data;  
    } catch (error) {
        throw error.response?.data?.message || "Error creating product"; 
    }
};

const getProducts = async (inventoryId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await axios.get(
            `${API_URL}/${inventoryId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching products";  
    }
};

const getProductsByBusinessId = async (businessId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        const response = await axios.post(
            `${API_URL}/products`,
            { businessId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,  
                },
            }
        );
        return response.data.data.products;  

    } catch (error) {
        console.error('Error retrieving products:', error.response?.data?.message || error.message);
        throw error;
    }
};


const deleteProduct = async (productId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));  
        const response = await axios.delete(
            `${API_URL}/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || "Error deleting product";  
    }
};

export {createProduct, getProducts, deleteProduct,getProductsByBusinessId};