import axios from 'axios';

const API_URL = 'https://inventorymanagement-3isj.onrender.com/api/inventory';

const createInventory = async (businessId, inventoryName) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        const response = await axios.post(
            `${API_URL}/${businessId}`, 
            {inventoryName}, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,  
                    'Content-Type': 'application/json', 
                },
            }
        );
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || "Error creating inventory";  
    }
};

const getInventories = async (businessId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        const response = await axios.get(
            `${API_URL}/${businessId}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,  
                },
            }
        );
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || "Error fetching inventories"; 
    }
};

const deleteInventory = async (inventoryId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await axios.delete(
            `${API_URL}/delete-inventory/${inventoryId}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error deleting inventory"; 
    }
};

export {createInventory, getInventories, deleteInventory}