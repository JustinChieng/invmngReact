import axios from "axios";

const API_URL = "http://localhost:5000";

export const getTodos = async (perPage, page) => {
  const params = new URLSearchParams({
    perPage: perPage,
    page: page,
  });
  const response = await axios.get(`${API_URL}/todos?${params.toString()}`);
  return response.data;
};

export const getTodo = async (id) => {
  const res = await axios.get(`${API_URL}/todos/${id}`);
  return res.data;
};

export const addTodo = async (data) => {
  const response = await axios.post(
    `${API_URL}/todos`,
    JSON.stringify( data ),
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token //include token in api 
      },
    }
  );
  return response.data;
};

export const updateTodo = async (data) => {
  const response = await axios.put(
    `${API_URL}/todos/${data.id}`,
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + data.token //include token in api 
      },
    }
  );
  return response.data;
};

export const deleteTodo = async (id) => {
  const res = await axios.delete(`${API_URL}/todos/${id}`);
  return res.data;
};

// No longer related to isCompleted
export const updateTodoStatus = async (id) => {
  const response = await axios.put(
    `${API_URL}/todos/${id}/status`,
    null,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
