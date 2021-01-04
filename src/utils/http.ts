import axios from 'axios';
import { getUserInfoFromStorage } from '../utils/token';

export const http = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${getUserInfoFromStorage().token}`,
  },
});
