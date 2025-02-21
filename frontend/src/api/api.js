import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getTransactions = () => axios.get(`${API_URL}/transactions`);
export const addTransaction = (transaction) => axios.post(`${API_URL}/transactions`, transaction);
export const deleteTransaction = (id) => axios.delete(`${API_URL}/transactions/${id}`);

export const getCategories = () => axios.get(`${API_URL}/categories`);

export const getBudgets = () => axios.get(`${API_URL}/budgets`);
export const addBudget = (budget) => axios.post(`${API_URL}/budgets`, budget);
export const deleteBudget = (id) => axios.delete(`${API_URL}/budgets/${id}`);
