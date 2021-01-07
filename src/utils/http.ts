import axios from 'axios';
import dotenv from 'dotenv';
import { getUserInfoFromStorage } from '../utils/token';

dotenv.config();

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}/api`,
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${getUserInfoFromStorage().token}`,
  },
});
