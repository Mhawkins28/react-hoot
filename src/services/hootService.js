import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

const index = async () => {
  try {
    const res = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const show = async (hootId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${hootId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (hootFormData) => {
  try {
    const res = await axios.post(`${BASE_URL}`, hootFormData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { index, show, create };
