import axios from "axios"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;


const signUp = async (formData) => {
    try {
        const res = await axios.post(`${BASE_URL}/sign-up`, formData)
        const data = await res.data

        if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      return JSON.parse(atob(data.token.split('.')[1])).payload;
    }

    throw new Error('Invalid response from server');
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const signIn = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/sign-in`, formData)

    const data = await res.data;

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export {signUp, signIn}