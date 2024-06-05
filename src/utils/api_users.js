import axios from "axios";

const API_URL = "http://localhost:5000";

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const getUser = async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`);
  return res.data;
};

export const addUser = async (data) => {
  const response = await axios.post(
    `${API_URL}/users/signup`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(
    `${API_URL}/users/login`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API_URL}/users/${id}`);
  return res.data;
};
