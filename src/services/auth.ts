import axios from 'axios';

export const registerUser = async (data: any) => {
  try {
    const result = await axios.post('http://localhost:5000/register', data);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (data: any) => {
  try {
    const result = await axios.post('http://localhost:5000/login', data);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
