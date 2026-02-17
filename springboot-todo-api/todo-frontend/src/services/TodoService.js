import axios from "axios";

const API_URL = "http://localhost:8080/api/todos";


export const getTodos = () => {
    return axios.get(API_URL);
};

export const createTodo = (todo) => {
    return axios.post(API_URL, todo);
};


export const deleteTodo = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const updateTodo = (id, todo) => {
    return axios.put(`${API_URL}/${id}`, todo);
};
