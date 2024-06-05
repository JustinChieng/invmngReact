import axios from "axios";

const API_URL = "http://localhost:5000";

export const getSuppliers = async (category, perPage, page) => {
  let params = {
    perPage: perPage,
    page: page,
  };
  if (category !== "all") {
    params.category = category;
  }
  const queries = new URLSearchParams(params);
  const response = await axios.get(API_URL + "/suppliers?" + queries.toString());
  return response.data;
};

export const getSupplier = async (id) => {
  const res = await axios.get(`${API_URL}/suppliers/${id}`);
  return res.data;
};

export const addSupplier = async (data) => {
  const response = await axios.post(
    `${API_URL}/suppliers`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const updateSupplier = async (data) => {
  const response = await axios.put(
    `${API_URL}/suppliers/${data.id}`, // url of the PUT API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const deleteSupplier = async (id) => {
  const res = await axios.delete(`${API_URL}/suppliers/${id}`);
  return res.data;
};
