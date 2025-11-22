import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy will handle the redirection to localhost:8080
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
