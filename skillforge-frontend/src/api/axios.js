import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ backend base path
});

export default instance;
