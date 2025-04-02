import axios from 'axios';

const API_URL = 'http://localhost:8000/api/sales';


const createSale = async (franchiseId, saleItems, saleAmount, saleDate) => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    try {
        const response = await axios.post(
            `${API_URL}/${franchiseId}`,
            { saleItems,saleAmount,saleDate},
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating sale:', error);
        throw error;
    }
};

const fetchSalesForFranchise = async (franchiseId) => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    try {
        const response = await axios.get(`${API_URL}/${franchiseId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });
        return response.data.data; 
    } catch (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }
};
export { createSale, fetchSalesForFranchise }