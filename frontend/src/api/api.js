import axios from "axios";

const API_URL = "https://5r4xyclo0j.execute-api.ap-south-1.amazonaws.com/dev/api";

export const getTransactions = () => axios.get(`${API_URL}/transactions`);
export const addTransaction = (transaction) => axios.post(`${API_URL}/transactions`, transaction);
export const deleteTransaction = (id) => axios.delete(`${API_URL}/transactions/${id}`);

export const getCategories = () => axios.get(`${API_URL}/categories`);

export const getBudgets = () => axios.get(`${API_URL}/budgets`);
export const addBudget = (budget) => axios.post(`${API_URL}/budgets`, budget);
export const deleteBudget = (id) => axios.delete(`${API_URL}/budgets/${id}`);
