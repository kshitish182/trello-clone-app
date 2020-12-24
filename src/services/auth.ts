import axios from 'axios';

export const registerUser = async (userData: any) => {
  try {
    const result = await axios.post('http://localhost:5000/register', userData);
    if (result.data.status === 201) {
      return result.data.data;
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
      return data;
    }

    throw `${result.data.status}: ${result.data.message}`;
  } catch (err) {
    console.log(err);

    return;
  }
};
