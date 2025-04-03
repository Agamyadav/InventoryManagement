import axios from 'axios';

const API_URL = 'https://inventorymanagement-3isj.onrender.com/api/order';
const fetchOrders = async (franchiseId) => {
    const token = JSON.parse(localStorage.getItem('accessToken')); 
    try {
        const response = await axios.get(`${API_URL}/${franchiseId}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.data.orders; 
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error; 
    }
};

const createOrder = async (franchiseId, orderItems, orderDate,orderAmount) => {
    console.log(orderAmount)
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await axios.post(`${API_URL}/${franchiseId}`, 
            {orderItems, orderDate,orderAmount},{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        ); 
        return response.data; 
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export {createOrder,fetchOrders};
