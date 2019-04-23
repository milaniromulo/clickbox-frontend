import axios from 'axios';

const api = axios.create({
    baseURL: 'https://clickbox-backend.herokuapp.com'
});

export default api;