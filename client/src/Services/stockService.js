import axios from 'axios';

const API_URL = 'https://inventorymanagement-3isj.onrender.com/api/franchise';


const getFranchiseStock = async (franchiseId, inventoryId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await axios.post(
            `${API_URL}/get-franchisestock`,  
            {
                franchiseId,
                inventoryId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || "Error fetching franchise stock"; 
    }
};


const updateProductStock = async (franchiseId, productId, newStock) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 

        const response = await axios.patch(
            `${API_URL}/update-product-stock`, 
            {
                franchiseId,
                productId,  
                quantity:newStock,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || "Error updating product stock"; 
    }
};

export {getFranchiseStock, updateProductStock};