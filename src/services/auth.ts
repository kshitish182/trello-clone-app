import axios from 'axios';

import { http } from '../utils/http';
import { setUserInfoInStorage, getUserInfoFromStorage } from '../utils/token';

export const registerUser = async (userData: any) => {
  try {
    const result = await axios.post('http://localhost:5000/register', userData);
    if (result.data.status === 201) {
      const { data } = result.data;
      setUserInfoInStorage({ email: data.email, token: data.accessToken });
      return {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        boards: data.boards,
      };
    }
  } catch (err) {
    console.log(err);

    return;
  }
};

export const loginUser = async (userData: any) => {
  try {
    const result = await axios.post('http://localhost:5000/login', userData);
    if (result.data.status === 200) {
      const { data } = result.data;
      setUserInfoInStorage({ email: data.email, token: data.accessToken });

      return {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        boards: data.boards,
      };
    }

    throw `${result.data.status}: ${result.data.message}`;
  } catch (err) {
    console.log(err);

    return;
  }
};

export const verifyToken = async (payload: { accessToken: string; email: string }) => {
  try {
    const result = await http.post('http://localhost:5000/verify-token', payload);
    const { data } = result.data;

    return data;
  } catch (err) {
    console.log(err.response.data);

    return null;
  }
};
