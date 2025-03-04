import httpService from "./HttpServices";
import { useState, useEffect } from "react";

export default function useApi() {
  const { get, post, put, del } = httpService();
  const [items, setItems] = useState([]);
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const getToken = () => {
    return localStorage.getItem("token");
  };
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const getUserRequest = async () => {
    try {
      const response = await get(`auth/me`);
      saveUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const response = await get(`/items`);
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemById = async (id) => {
    try {
      const response = await get(`/items/${id}`);
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await get(`/categories`);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postItem = async (data) => {
    try {
      const response = await post("/items", data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateItem = async (id, data) => {
    try {
      const response = await put(`/items/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await del(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await post("/auth/login", { email, password });
      saveToken(response.data.token);
      saveUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await post("/auth/register", { email, password });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    getItems();
  }, []);

  return {
    setToken: saveToken,
    token,
    getUserRequest,
    user,
    getToken,
    postItem,
    updateItem,
    deleteItem,
    getItems,
    getItemById,
    getCategories,
    login,
    register,
    logout,
    items,
    item,
    categories,
  };
}
