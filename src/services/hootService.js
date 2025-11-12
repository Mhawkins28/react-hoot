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

const createComment = async (hootId, commentFormData) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/${hootId}/comments`,
      commentFormData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteHoot = async (hootId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${hootId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (hootId, hootFormData) => {
  try {
    const res = await axios.put(`${BASE_URL}/${hootId}`, hootFormData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { index, show, create, createComment, deleteHoot, update };
