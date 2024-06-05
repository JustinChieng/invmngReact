import axios from "axios";

const API_URL = "http://localhost:5000";

export const getProducts = async (category,box, perPage, page) => {
  // axios method
  /* 
      Our goal is to go to this url to get the filtered data
      http://localhost:5000/movies?genre=Comedy&sort=rating
    */
  // URL SEARCH PARAMS method
  let params = {
    perPage: perPage,
    page: page,
  };
  if (category !== "all") {
    params.category = category;
  }
  if (box !== "all") {
    params.box = box;
  }
  const queries = new URLSearchParams(params);
  const response = await axios.get(API_URL + "/products?" + queries.toString());
  return response.data;

};

export const getProduct = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const response = await axios.post(
    `${API_URL}/products`, // url of the POST API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const updateProduct = async (data) => {
  const response = await axios.put(
    `${API_URL}/products/${data.id}`, // url of the PUT API
    JSON.stringify(data), // data you want to pass through the API in JSON format
    {
      headers: {
        "Content-Type": "application/json", // telling the API you are sending JSON data
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/products/${id}`);
  return res.data;
};
