import axios from 'axios';

const API_URL = 'http://localhost:8000/api/dashboard';
const fetchLowStockItems = async (franchiseId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await fetch(`${API_URL}/low-stock/${franchiseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching low stock items:', error);
        throw error; 
    }
};

const fetchHighestSellingProducts = async (franchiseId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await fetch(`${API_URL}/highest-selling-products/${franchiseId}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Failed to fetch highest selling products:", error);
        return null; 
    }
};
export {fetchLowStockItems,fetchHighestSellingProducts}