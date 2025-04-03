import axios from 'axios';

const API_URL = 'https://inventorymanagement-3isj.onrender.com/api/';



const sendOTP = async (email) => {
    const response = await axios.post(`${API_URL}user/send-email-verification`, {email});
    return response.data;
}

const verifyOTP = async (otp) => {
    const response = await axios.post(`${API_URL}user/verify-email-verification`, {otp});
    return response.data;
}

const register = async (formData) => {
    const response = await axios.post(`${API_URL}user/register`, {formData});
    return response.data;
}

const login = async (email, password) => {
    const response = await axios.post(`${API_URL}user/login`, {email, password});
    if(response.status === 200){
        localStorage.setItem("userData", JSON.stringify(response.data));
        localStorage.setItem("accessToken", JSON.stringify(response.data.data.accessToken))
    }
    return response.status;
    
}

const getCurrentUser = async () => {
    const token = JSON.parse(localStorage.getItem("userData"))?.data?.accessToken;
    if(!token) return;
    const response = await axios.get(`${API_URL}user/get-current-user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}


const getUser =  async () => {
    const token = JSON.parse(localStorage.getItem('accessToken')); 
    const response = await axios.get(`${API_URL}user/get-current-user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

const updateDetails = async (updatedData) => {
    try {
        const token = JSON.parse(localStorage.getItem('accessToken')); 
        const response = await axios.patch(`${API_URL}user/update-details`, updatedData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Details updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating details:', error.response?.data || error.message);
        throw error;
    }
};


const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("status");
    localStorage.removeItem("accessToken");
    window.location.reload();
}

export {sendOTP , verifyOTP, register, login, getCurrentUser,logout, updateDetails, getUser};