import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'https://chat-app-backend-2yeu.onrender.com' : '/api',
    withCredentials: true,
});

export default instance;
