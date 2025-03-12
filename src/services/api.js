import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api', // Update this if your Django server runs on a different port
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
