import axios from 'axios';

const API_URL = 'http://localhost:8000/api/franchise';

const handleCreateFranchise = async (franchiseData) => {
    const token = JSON.parse(localStorage.getItem('accessToken')); 
    try {
        const response = await axios.post(`${API_URL}/create`, franchiseData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Franchise created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating franchise:', error.response?.data || error.message);
        throw new Error('There was an error creating the franchise.');
    }
};

const fetchFranchises = async (businessId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 

        const response = await axios.post(`${API_URL}/get-franchises`, {
            businessId: businessId,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching franchises:', error.response?.data || error.message);
    }
};



const setManager = async (managerData) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 

        const response = await axios.post(
            `${API_URL}/set-manager`, 
            managerData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Error setting manager:", error);
        throw error.response ? error.response.data : error.message;
    }
};


const getFranchise = async (franchiseId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await axios.post(
            `${API_URL}/get-franchise`, 
            { franchiseId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error fetching franchise";
    }
};

const createFranchiseStock = async (franchiseId, businessId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        const response = await axios.post(
            `${API_URL}/create-franchise-stock`,  
            { franchiseId, businessId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        console.log('Franchise stock created successfully:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error creating franchise stock:', error.response?.data?.message || error.message);
        throw error;
    }
};

const fetchFranchiseStock = async (franchiseId) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        const response = await axios.post(
            `${API_URL}/get-franchise-stock`,
            { franchiseId }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching franchise stock:', error.response?.data?.message || error.message);
        throw error; 
    }
};

export {handleCreateFranchise, fetchFranchises, setManager,fetchFranchiseStock, getFranchise,createFranchiseStock}
